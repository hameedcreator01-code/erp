import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, 
  FastForward, SkipBack, SkipForward, Sparkles, Video, 
  MousePointer, ChevronRight, Check
} from 'lucide-react';
import { STORYBOARD_SCENES } from '../data/storyboard';
import { StoryboardScene, SceneId } from '../types';

interface StoryboardPlayerProps {
  currentTime: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onReset: () => void;
  activeScene: StoryboardScene;
  mode: 'video' | 'interactive';
  onToggleMode: (newMode: 'video' | 'interactive') => void;
}

export const StoryboardPlayer: React.FC<StoryboardPlayerProps> = ({
  currentTime,
  isPlaying,
  onPlayPause,
  onSeek,
  onReset,
  activeScene,
  mode,
  onToggleMode
}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastSpokenSceneRef = useRef<string | null>(null);

  // Web Speech API Voiceover Synthesizer
  useEffect(() => {
    if (!isAudioEnabled || !isPlaying || mode !== 'video') {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (activeScene && activeScene.voiceover && lastSpokenSceneRef.current !== activeScene.id) {
      lastSpokenSceneRef.current = activeScene.id;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(activeScene.voiceover);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        
        // Prefer natural English voice if available
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium')));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [activeScene, isAudioEnabled, isPlaying, mode]);

  const toggleAudio = () => {
    const nextState = !isAudioEnabled;
    setIsAudioEnabled(nextState);
    if (!nextState && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-slate-950 text-white border-b border-slate-800 shadow-xl select-none sticky top-0 z-40">
      {/* Top Bar: Mode Switcher & Scene Indicator */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-900 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => onToggleMode('video')}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'video'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>60s Video Walkthrough</span>
            </button>
            <button
              onClick={() => onToggleMode('interactive')}
              className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mode === 'interactive'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MousePointer className="w-3.5 h-3.5" />
              <span>Free Interactive App</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs">
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-emerald-400">
              {activeScene.timeRange}
            </span>
            <span>{activeScene.title}</span>
          </div>
        </div>

        {/* Audio / Voiceover Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border ${
              isAudioEnabled 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title={isAudioEnabled ? 'Mute Voiceover Audio' : 'Enable Voiceover Audio'}
          >
            {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isAudioEnabled ? 'Voiceover ON' : 'Voiceover Muted'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Scrubber & Player Controls (Visible in Video Mode) */}
      <div className="px-4 py-2.5 flex flex-col gap-2">
        {/* Progress Bar with Scene Segments */}
        <div className="relative w-full group py-1">
          {/* Track */}
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex cursor-pointer relative">
            {STORYBOARD_SCENES.map((scene) => {
              const widthPct = ((scene.endTime - scene.startTime) / 60) * 100;
              const isPast = currentTime >= scene.endTime;
              const isCurrent = currentTime >= scene.startTime && currentTime < scene.endTime;

              return (
                <div
                  key={scene.id}
                  onClick={() => onSeek(scene.startTime)}
                  style={{ width: `${widthPct}%` }}
                  className={`h-full border-r border-slate-950/60 transition-colors relative cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-500'
                      : isPast
                      ? 'bg-emerald-700/60'
                      : 'bg-slate-700/60 hover:bg-slate-600'
                  }`}
                  title={`${scene.timeRange}: ${scene.title}`}
                />
              );
            })}
          </div>

          {/* Draggable Scrubber Head */}
          <input
            type="range"
            min={0}
            max={60}
            step={0.1}
            value={currentTime}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          />

          {/* Current scrubber needle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none rounded shadow-md"
            style={{ left: `${(currentTime / 60) * 100}%` }}
          />
        </div>

        {/* Control Buttons & Scene Quick Jump Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onPlayPause}
              className="w-8 h-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center shadow transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
            </button>

            <button
              onClick={onReset}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
              title="Restart 0-60s Demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <span className="font-mono text-xs text-slate-300 pl-1 font-semibold">
              {formatTime(currentTime)} <span className="text-slate-600">/ 1:00</span>
            </span>
          </div>

          {/* Scene Quick Jump Pills */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto text-[11px]">
            {STORYBOARD_SCENES.map((scene) => {
              const isActive = currentTime >= scene.startTime && currentTime < scene.endTime;
              return (
                <button
                  key={scene.id}
                  onClick={() => onSeek(scene.startTime)}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  {scene.timeRange}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Voiceover Subtitle Caption Bar */}
      <div className="bg-slate-900/90 border-t border-slate-800/80 px-4 py-2 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
          <span className="font-bold text-slate-300 shrink-0">Voiceover:</span>
          <span className="text-emerald-300 italic truncate">
            “{activeScene.voiceover}”
          </span>
        </div>
        <span className="text-[11px] text-slate-500 shrink-0 font-medium">
          {activeScene.onScreenText}
        </span>
      </div>
    </div>
  );
};
