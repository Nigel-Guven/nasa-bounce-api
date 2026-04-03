import galaxy from '../assets/galaxy.jpg';

const LiveFeed = () => {
  const feeds = [
    {
      title: "NASA TV: Artemis II Live Footage",
      videoId: "m3kR2KK8TEs", 
      description: "Direct broadcast of the Artemis II lunar mission and coverage highlights."
    }, 
    {
      title: "Orion: Live Satellite Footage",
      videoId: "6RwfNBtepa4", 
      description: "Live video from the Orion Satellite."
    },
    {
      title: "ISS: Live feed of the Space Station",
      videoId: "sWasdbDVNvc", 
      description: "Live video of the International Space Station."
    },
    {
      title: "ISS: Live HD Views of Earth",
      videoId: "zPH5KtjJFaQ", 
      description: "Live HD video of Earth view from the International Space Station."
    }
  ];

  return (
    <div
      className="p-6 min-h-screen w-full text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${galaxy})` }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Live Cosmic Feeds</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {feeds.map((feed) => (
          <div key={feed.videoId} className="bg-black/60 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/10">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg mb-4">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${feed.videoId}?autoplay=0&mute=1&rel=0`}
                title={feed.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-blue-300">{feed.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{feed.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;