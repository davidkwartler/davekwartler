export const metadata = {
  title: "About Me - David Kwartler",
  description: "Learn more about David Kwartler",
};

export default function About() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          About Me
        </h1>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Hey there! I'm David. I'm originally from Boston, MA 🍀, went to college in Washington, DC 🏛️, and now live in sunny Austin, TX 🤠. I work in tech as a product manager, but my time outside work revolves around cars, music, and being outdoors.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            I'm a performance car enthusiast and amateur racecar driver 🏎️, so odds are you'll catch me behind the wheel of my 2011 Chevrolet Corvette. I also love being outdoors, whether it's biking 🚴‍♂️ around town or getting out on the water in a kayak 🛶.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Music 🎶 is a huge part of my life. I went to over 75 shows in 2024, and I'm really into electronic dance music 🪩. I've been learning to DJ, and I also collect vinyl so my record shelf is always growing 💿.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            I've been vegan 🌱 since 2016, love to cook, make espresso ☕, and explore new hard-to-find bourbons 🥃. My cat Rey keeps life interesting, she's great and definitely runs the household 🐈‍⬛🏠.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Other than that, I'm probably watching Austin FC ⚽ or the Atlanta Falcons 🏈, still hoping for that winning season 🏆.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <figure className="space-y-3">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">[Photo: Racing at New England Dragway]</span>
            </div>
            <figcaption className="text-sm text-gray-600 dark:text-gray-400 italic text-center">
              Racing my dad's 2009 Chevrolet Corvette at New England Dragway. Best 1/4 mile time: 9.98 seconds at 136 miles per hour.
            </figcaption>
          </figure>

          <figure className="space-y-3">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">[Photo: Swedish House Mafia concert]</span>
            </div>
            <figcaption className="text-sm text-gray-600 dark:text-gray-400 italic text-center">
              Enjoying a Swedish House Mafia concert at Lucca Summer Festival in Lucca, Italy.
            </figcaption>
          </figure>

          <figure className="space-y-3">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">[Photo: Austin FC playoff game]</span>
            </div>
            <figcaption className="text-sm text-gray-600 dark:text-gray-400 italic text-center">
              Attending an Austin FC playoff game with my friends. Verde Listos!
            </figcaption>
          </figure>
        </div>
      </div>
    </main>
  );
}
