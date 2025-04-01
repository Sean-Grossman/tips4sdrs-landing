"use client";

import React from 'react';
import { useTips, Tip } from '../context/TipContext';

// LinkedIn Reaction icon component
const ReactionIcon = ({ 
  type, 
  count, 
  tipId, 
  onReactionClick 
}: { 
  type: string; 
  count: number; 
  tipId: string;
  onReactionClick: (tipId: string, reactionType: keyof Tip['reactions']) => void;
}) => {
  let imgSrc = '';
  let altText = '';
  
  // Map reaction type to image path
  switch (type) {
    case 'like':
      imgSrc = '/images/linkedinReactions/linkedInReactionLike.png';
      altText = 'Like';
      break;
    case 'celebrate':
      imgSrc = '/images/linkedinReactions/LinkedInReactionCelebrate.png';
      altText = 'Celebrate';
      break;
    case 'support':
      imgSrc = '/images/linkedinReactions/linkedInReactionSupport.png';
      altText = 'Support';
      break;
    case 'love':
      imgSrc = '/images/linkedinReactions/linkedInReactionLove.png';
      altText = 'Love';
      break;
    case 'insightful':
      imgSrc = '/images/linkedinReactions/linkedinReactionInsightful.png';
      altText = 'Insightful';
      break;
    case 'curious':
      imgSrc = '/images/linkedinReactions/linkedInReactionCurious.png';
      altText = 'Curious';
      break;
    case 'laugh':
      imgSrc = '/images/linkedinReactions/linkedInReactionLaugh.png';
      altText = 'Laugh';
      break;
    default:
      imgSrc = '';
      altText = '';
  }

  // Only render if there are reactions or it's a primary reaction type (like, celebrate, support)
  if (count === 0 && !['like', 'celebrate', 'support'].includes(type)) {
    return null;
  }

  const handleClick = () => {
    onReactionClick(tipId, type as keyof Tip['reactions']);
  };

  return (
    <div 
      className="flex items-center mr-4 mb-2 reaction-icon cursor-pointer group relative"
      onClick={handleClick}
    >
      <div className="w-5 h-5 relative">
        <img 
          src={imgSrc} 
          alt={altText}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="ml-1 text-xs text-text-muted">{count}</span>
      
      {/* Tooltip - XP-style */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-accent-panel border border-border text-text text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-panel">
        React with {altText}
      </div>
    </div>
  );
};

// XP-style Tip card component
const TipCard = ({ 
  tip,
  onReactionClick
}: { 
  tip: Tip;
  onReactionClick: (tipId: string, reactionType: keyof Tip['reactions']) => void;
}) => {
  return (
    <div className="tip-card">
      {/* XP-style title bar */}
      <div className="flex justify-between items-center mb-4 bg-alt-bg -mx-4 -mt-4 px-4 py-2 border-b border-border">
        <div className="font-bold text-sm uppercase tracking-wide">Tip #{tip.id}</div>
        <div className="text-text-muted caption">{tip.timestamp}</div>
      </div>
      
      <div className="mb-4">
        <div className="font-semibold mb-3">
          <span>{tip.sender}</span> tipped <span>{tip.recipient}</span> <span className="text-link-blue">${tip.amount}</span>
        </div>
        <p className="text-text p-3 bg-white border border-border shadow-bevel">{tip.note}</p>
      </div>
      
      <hr className="xp-divider mb-3" />
      
      <div className="flex flex-wrap">
        <ReactionIcon type="like" count={tip.reactions.like} tipId={tip.id} onReactionClick={onReactionClick} />
        <ReactionIcon type="celebrate" count={tip.reactions.celebrate} tipId={tip.id} onReactionClick={onReactionClick} />
        <ReactionIcon type="support" count={tip.reactions.support} tipId={tip.id} onReactionClick={onReactionClick} />
        <ReactionIcon type="love" count={tip.reactions.love} tipId={tip.id} onReactionClick={onReactionClick} />
        <ReactionIcon type="insightful" count={tip.reactions.insightful} tipId={tip.id} onReactionClick={onReactionClick} />
        <ReactionIcon type="curious" count={tip.reactions.curious} tipId={tip.id} onReactionClick={onReactionClick} />
        <ReactionIcon type="laugh" count={tip.reactions.laugh} tipId={tip.id} onReactionClick={onReactionClick} />
      </div>
    </div>
  );
};

const TippingFeed = () => {
  const { tips, addReaction } = useTips();
  
  // Calculate total stats
  const totalTips = tips.length;
  const totalValue = tips.reduce((sum, tip) => sum + tip.amount, 0);
  
  return (
    <section className="py-16 alt-section">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* XP-style header with underline */}
        <div className="mb-10 pb-3 border-b-2 border-border">
          <h2 className="font-montserrat font-bold text-3xl md:text-h2 text-text uppercase tracking-tight leading-tight">
            Recent Tips
          </h2>
          <p className="mt-3 text-lg text-text-muted">
            Showing <span className="font-semibold text-link-blue">{totalTips}</span> recent tips with a total value of <span className="font-semibold text-link-blue">${totalValue}</span>
          </p>
        </div>
        
        {/* XP-style card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <div key={tip.id} className="border border-border shadow-bevel p-4 rounded-md relative">
              <TipCard tip={tip} onReactionClick={addReaction} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TippingFeed;
