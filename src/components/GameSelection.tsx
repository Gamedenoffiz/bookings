import React, { useState, useEffect } from 'react';
import { Star, Trophy, Zap } from 'lucide-react';

const games = [
    {
        title: "Grand Theft Auto V",
        image: "https://media.rockstargames.com/rockstargames-newsite/uploads/3318f4e14af22baef853213b01a8390ca6921c2b.jpg",
        rating: 4.8,
        genre: "Action/Adventure",
        players: "Single Player",
        console: "PS4 & PS4 Pro",
        featured: true
    },
    {
        title: "WWE 2K SmackDown",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrfYe95FroDnja_z_psqV6jC9mooVH6TGpNw&s",
        rating: 4.6,
        genre: "Sports/Wrestling",
        players: "Up to 4 Players",
        console: "PS4 & PS4 Pro",
        featured: true
    },
    {
        title: "Mortal Kombat 11",
        image: "https://sm.ign.com/ign_in/screenshot/default/dp_tvfd.jpg",
        rating: 4.7,
        genre: "Fighting",
        players: "2 Players",
        console: "PS4 & PS4 Pro",
        featured: true
    },
    {
        title: "Red Dead Redemption 2",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg?t=1720558643",
        rating: 4.9,
        genre: "Action/Adventure",
        players: "Single Player",
        console: "PS4 & PS4 Pro",
        featured: false
    },
    {
        title: "FIFA 24",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2195250/f11315d7491f706b09b059d12424f711e9778b82/capsule_616x353.jpg?t=1749141175",
        rating: 4.5,
        genre: "Sports/Football",
        players: "Up to 4 Players",
        console: "PS4 & PS4 Pro",
        featured: false
    },
    {
        title: "Spider-Man",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgkrYsVQkBwTJ6YQ8JtkT-VwyvKnd9xjyeQ&s",
        rating: 4.8,
        genre: "Action/Adventure",
        players: "Single Player",
        console: "PS4 Pro",
        featured: false
    }
];

const GameCard = ({ game, index }) => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const parallaxStyle = {
        transform: `translateY(${offsetY * 0.05}px)`
    };

    return (
        <div key={index} className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
            {game.featured && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-1">
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Featured</span>
                </div>
            )}
            
            {/* Image Container - Mobile optimized */}
            <div className="relative h-40 sm:h-48 overflow-hidden">
                <div
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 game-image-parallax"
                    style={{ backgroundImage: `url(${game.image})`, ...parallaxStyle }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            </div>
            
            {/* Content - Mobile spacing */}
            <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors leading-tight">
                    {game.title}
                </h3>
                
                {/* Genre and Players - Mobile layout */}
                <div className="mb-3 space-y-1">
                    <p className="text-gray-400 text-sm sm:text-base">{game.genre}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{game.players}</p>
                </div>
                
                {/* Rating and Console - Mobile layout */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 font-semibold text-sm sm:text-base">{game.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-purple-400">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">{game.console}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GameSelection = () => {
    return (
        <section id="games" className="py-12 sm:py-16 lg:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header - Mobile optimized */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                        Premium Game Library
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
                        Choose from our extensive collection of the latest and greatest PlayStation exclusives and popular titles
                    </p>
                </div>
                
                {/* Games Grid - Mobile-first responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {games.map((game, index) => (
                        <GameCard game={game} index={index} key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GameSelection;