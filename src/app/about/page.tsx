export const metadata = {
  title: "About Me - David Kwartler",
  description: "Learn more about David Kwartler",
};

export default function About() {
  return (
    <main className="min-h-screen bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          About Me
        </h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-gray-300 leading-relaxed">
            I'm David. I grew up in Boston, went to college in Washington, DC, and now live in Austin, a city that makes it easy to stay active, explore, and enjoy the outdoors year-round.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Outside of work, I'm drawn to pursuits that reward focus and momentum. I'm a performance car enthusiast and amateur race car driver, currently spending time behind the wheel of a Porsche Cayman. I stay active with long bike rides around the Town Lake trail.
          </p>

          <p className="text-gray-300 leading-relaxed">
            Music has always been a constant in my life. I'm especially into EDM and hard rock, and last year I made it to around 80 live shows across several festivals. More recently, that interest has expanded into learning to DJ and building a growing vinyl collection at home.
          </p>

          <p className="text-gray-300 leading-relaxed">
            I love to travel and have spent much of the last few years visiting cities across the U.S. and Canada, often planning trips around food, art museums, and good music.
          </p>

          <p className="text-gray-300 leading-relaxed">
            I've been vegan for a decade and enjoy cooking, making espresso, and the occasional hunt for a good bottle of bourbon. At home, my cat Rey keeps me grounded. She's my best friend and very much in charge.
          </p>

          <p className="text-gray-300 leading-relaxed">
            When things slow down, I'm probably watching Austin FC or the Atlanta Falcons and holding onto hope for a winning season.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <figure className="space-y-3">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">[Photo: Racing at New England Dragway]</span>
            </div>
            <figcaption className="text-sm text-gray-400 italic text-center">
              Racing my dad's 2009 Chevrolet Corvette at New England Dragway. Best 1/4 mile time: 9.98 seconds at 136 miles per hour.
            </figcaption>
          </figure>

          <figure className="space-y-3">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">[Photo: Swedish House Mafia concert]</span>
            </div>
            <figcaption className="text-sm text-gray-400 italic text-center">
              Enjoying a Swedish House Mafia concert at Lucca Summer Festival in Lucca, Italy.
            </figcaption>
          </figure>

          <figure className="space-y-3">
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">[Photo: Austin FC playoff game]</span>
            </div>
            <figcaption className="text-sm text-gray-400 italic text-center">
              Attending an Austin FC playoff game with my friends. Verde Listos!
            </figcaption>
          </figure>
        </div>
      </div>
    </main>
  );
}
