import React, { useState, useCallback } from "react";
import axios from "axios";
import { Search, Download, Pause, Play, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Music_API = () => {
  const [input, setInput] = useState("");
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [playingTrack, setPlayingTrack] = useState(null);

  const HandleResponse = async () => {
    if (!input.trim()) {
      setError("Please enter a song!");
      return;
    }

    setLoading(true);
    setError("");
    setSongs([]);

    try {
      const { data } = await axios.get(
        `https://saavn.dev/api/search/songs?query=${input}`
      );

      if (data?.data?.results?.length) {
        setSongs(data.data.results);
      } else {
        setError("Song Not Found!");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Failed to fetch songs!");
    } finally {
      setLoading(false);
    }
  };

  const downloadSong = useCallback(async (songName, audioUrl) => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${songName}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-green-400 mb-6">Music Player</h1>
          
          <div className="relative flex items-center max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for songs..."
              className="w-full px-4 py-3 pr-12 rounded-full bg-gray-800 border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && HandleResponse()}
            />
            <button
              className="absolute right-2 p-2 text-gray-400 hover:text-white transition-colors"
              onClick={HandleResponse}
              disabled={loading}
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="text-red-400 text-center py-4 bg-red-900/20 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {songs.map((song, index) => {
            const audioUrl =
              song.downloadUrl?.length > 0
                ? song.downloadUrl[song.downloadUrl.length - 1].url
                : null;
            const isPlaying = playingTrack === song.id;

            return (
              <div
                key={song.id || index}
                className="group bg-gray-800/50 hover:bg-gray-800 rounded-lg p-4 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="relative mb-4">
                  <img
                    src={song.image[song.image.length - 1].url}
                    alt={song.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  {audioUrl && (
                    <button
                      onClick={() => setPlayingTrack(isPlaying ? null : song.id)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {isPlaying ? (
                        <Pause className="w-12 h-12 text-white" />
                      ) : (
                        <Play className="w-12 h-12 text-white" />
                      )}
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg line-clamp-1">{song.name}</h3>
                      <p className="text-gray-400 text-sm line-clamp-1">
                        {song.artists.primary.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                    
                    {audioUrl && (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-1 hover:bg-gray-700 rounded-full transition-colors">
                          <MoreVertical size={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem 
                            onClick={() => downloadSong(song.name, audioUrl)}
                            className="flex items-center gap-2"
                          >
                            <Download size={16} />
                            Download
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  
                  {audioUrl && (
                    <div className="pt-2">
                      <audio
                        controls
                        className="w-full h-8"
                        onPlay={() => setPlayingTrack(song.id)}
                        onPause={() => setPlayingTrack(null)}
                      >
                        <source src={audioUrl} type="audio/mpeg" />
                      </audio>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Music_API;