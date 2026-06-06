import React from "react";
import { History, Trash2, GitPullRequest, Star, Calendar } from "lucide-react";
import { SavedAnalysis } from "../types";

interface HistorySidebarProps {
  historyList: SavedAnalysis[];
  onSelectHistory: (id: string) => void;
  onDeleteHistory: (id: string) => void;
  currentActiveId: string | null;
}

export default function HistorySidebar({ historyList, onSelectHistory, onDeleteHistory, currentActiveId }: HistorySidebarProps) {
  if (historyList.length === 0) {
    return (
      <div id="history-sidebar-empty" className="bg-[#161b22] p-5 rounded-2xl border border-[#30363d] text-center space-y-2">
        <History className="w-8 h-8 text-[#8b949e] mx-auto" />
        <h4 className="font-display font-semibold text-xs text-white uppercase">Analysis Logs</h4>
        <p className="text-xs text-[#8b949e] font-sans leading-relaxed">
          No previous scanning history. Generated reports will auto-save on your device local cache.
        </p>
      </div>
    );
  }

  return (
    <div id="history-sidebar-root" className="bg-[#161b22] rounded-2xl border border-[#30363d] p-5 space-y-4 shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#30363d] pb-2.5">
        <History className="w-4.5 h-4.5 text-[#58a6ff]" />
        <h4 className="font-display font-semibold text-xs text-white uppercase">Analysis History ({historyList.length})</h4>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        {historyList.map((item) => {
          const isActive = currentActiveId === item.id;
          const formattedDate = new Date(item.analyzedAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });

          return (
            <div
              key={item.id}
              className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                isActive
                  ? "bg-[#0d1117] border-[#58a6ff] text-white shadow-md font-bold"
                  : "bg-[#0d1117]/50 hover:bg-[#1f242c] border-[#30363d] text-[#c9d1d9]"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectHistory(item.id)}
                className="flex-1 min-w-0 pr-2 focus:outline-none text-left cursor-pointer"
              >
                <div className="flex items-center gap-1.5 font-display text-sm font-semibold truncate">
                  <GitPullRequest className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-[#58a6ff]" : "text-[#8b949e]"}`} />
                  <span className="truncate">{item.owner}/{item.repo}</span>
                </div>
                <div className="flex items-center gap-2.5 text-[10px] font-mono mt-1 text-[#8b949e]">
                  <span className="flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                    {item.stars ? item.stars.toLocaleString() : "Meta Scan"}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Calendar className="w-2.5 h-2.5 text-[#58a6ff]" />
                    {formattedDate}
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => onDeleteHistory(item.id)}
                className={`p-1.5 rounded-lg border flex-shrink-0 transition-opacity cursor-pointer ${
                  isActive
                    ? "border-[#30363d] text-[#8b949e] hover:text-[#f85149] hover:bg-[#161b22]"
                    : "border-[#30363d] text-[#8b949e] hover:text-[#f85149] hover:border-[#f85149]/40 hover:bg-[#f85149]/10"
                }`}
                title="Delete history index"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
