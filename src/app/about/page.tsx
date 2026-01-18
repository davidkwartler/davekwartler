import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Me - David Kwartler",
  description: "Learn more about David Kwartler",
};

export default function About() {
  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col">
      <div className="flex-grow max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12 font-[family-name:var(--font-playfair)] tracking-wide">
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

        <div className="mt-16 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <figure className="space-y-2 mx-auto sm:mx-0 w-3/4 sm:w-full">
              <Image
                src="/bike-austin.png"
                alt="Biking in Austin"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
              <figcaption className="text-sm text-gray-400 italic text-center">
                Biking the Town Lake Trail in Austin
              </figcaption>
            </figure>

            <figure className="space-y-2 mx-auto sm:mx-0 w-3/4 sm:w-full">
              <Image
                src="/corvette.jpg"
                alt="Corvette"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
              <figcaption className="text-sm text-gray-400 italic text-center">
                Corvette racing at New England Dragway
              </figcaption>
            </figure>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <figure className="space-y-2 mx-auto sm:mx-0 w-3/4 sm:w-full">
              <Image
                src="/david-chicago.JPG"
                alt="David in Chicago"
                width={400}
                height={600}
                className="w-full h-auto rounded-lg"
              />
              <figcaption className="text-sm text-gray-400 italic text-center">
                Visiting the Bean in Chicago
              </figcaption>
            </figure>

            <figure className="space-y-2 mx-auto sm:mx-0 w-3/4 sm:w-full">
              <Image
                src="/david-seattle.JPG"
                alt="David at the Seattle Space Needle"
                width={400}
                height={600}
                className="w-full h-auto rounded-lg"
              />
              <figcaption className="text-sm text-gray-400 italic text-center">
                View from the Space Needle in Seattle
              </figcaption>
            </figure>

            <figure className="space-y-2 mx-auto sm:mx-0 w-3/4 sm:w-full">
              <Image
                src="/david-nyc.JPG"
                alt="David in New York City"
                width={400}
                height={600}
                className="w-full h-auto rounded-lg"
              />
              <figcaption className="text-sm text-gray-400 italic text-center">
                Manhattan skyline views in New York City
              </figcaption>
            </figure>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <figure className="space-y-2 mx-auto sm:mx-0 w-3/4 sm:w-full">
              <Image
                src="/david-falcons.JPG"
                alt="David at a Falcons game"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
              <figcaption className="text-sm text-gray-400 italic text-center">
                Atlanta Falcons game in Massachusetts
              </figcaption>
            </figure>

            <figure className="space-y-2 mx-auto sm:mx-0 w-3/4 sm:w-full">
              <Image
                src="/identiverse.jpg"
                alt="David at Identiverse"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg"
              />
              <figcaption className="text-sm text-gray-400 italic text-center">
                Identiverse with my team in Las Vegas
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
