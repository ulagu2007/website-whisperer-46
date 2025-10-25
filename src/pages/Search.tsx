import { Sidebar } from "@/components/Sidebar";
import { Player } from "@/components/Player";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto pb-24">
        <section className="px-8 pt-12">
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="What do you want to listen to?"
              className="pl-10 h-12 bg-card border-0 text-base"
            />
          </div>
        </section>

        <section className="px-8 pt-8">
          <h2 className="text-2xl font-bold mb-6">Browse All</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {["Pop", "Hip-Hop", "Rock", "Electronic", "Jazz", "Classical", "Country", "R&B"].map((genre) => (
              <div
                key={genre}
                className="aspect-square rounded-lg bg-gradient-to-br from-primary/80 to-primary/40 p-4 cursor-pointer hover:scale-105 transition-transform"
              >
                <h3 className="text-2xl font-bold">{genre}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Player />
    </div>
  );
};

export default Search;
