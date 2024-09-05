"use client";

import { useEffect, useState } from 'react';
import NecklinesImg from "@/assets/necklines.jpg";
import Rectangle from "@/assets/Rectangle.jpg";
import InvTriangle from "@/assets/InvTriangle.jpg";
import Pear from "@/assets/Pear.jpg";
import Hourglass from "@/assets/Hourglass.jpg";
import Apple from "@/assets/Hourglass.jpg";
import Image from 'next/image';

interface ShapeResultsProps {
  shapePercentages: { [key: string]: number }; // Key-value pair for body shape percentages
  primaryShape: string | null
  widerShoulders: boolean | null;
  slimmerHips: boolean | null;
  fullerBust: boolean | null;
}

const ShapeResults: React.FC<ShapeResultsProps> = ({ 
  shapePercentages, 
  widerShoulders, 
  slimmerHips, 
  fullerBust 
}) => {
  const [styleGuide, setStyleGuide] = useState<string>('');
  const [necklineRec, setNecklineRec] = useState<string>('');
  const [influencer, setInfluencer] = useState<string>('');
  const [primaryShape, setPrimaryShape] = useState<string>('');

  const bodyShapeImages: { [key: string]: any } = {
    hourglass: Hourglass,
    pear: Pear,
    apple: Apple,
    rectangle: Rectangle,
    invertedTriangle: InvTriangle,
  };

  const bodyShapeDescriptions: any = {
    hourglass: 'Balanced bust and hips with a well-defined waist.',
    pear: 'Wider hips with a narrower bust and shoulders.',
    apple: 'Broad shoulders and bust with weight around the midsection; slimmer hips.',
    rectangle: 'Bust, waist, and hips are similar in width with little waist definition.',
    invertedTriangle: 'Wider shoulders or bust with narrower hips.'
  };

  useEffect(() => {
    // Determine the body shape with the highest percentage
    const maxShape = Object.keys(shapePercentages).reduce((a, b) => 
      shapePercentages[a] > shapePercentages[b] ? a : b
    );

    setPrimaryShape(maxShape);

    // Get dynamic styleGuide and necklineRecommendation based on primaryShape
    const getRecommendations = (primaryShape: string) => {
      switch (primaryShape.toLowerCase()) {
        case 'pear':
          return {
            styleGuide: `1. Use structured shoulders designs to widen the shoulder line in a flattering way.
            2. Add some pop with bright colors on your upper body to bring some fun and energy to your look.
            3. Play with eye-catching prints, textures, and details strategically to create visual interest at the top. 
            4. Choose fitted clothes to highlight your waist and create a flattering silhouette.
            5. Experiment with layering on your top half to add depth and draw the eye up.
            6. Opt for tops that accentuate your waist rather than hiding it with boxy styles.
            7. Try out darker colors on your lower body for a sleek and sophisticated look.
            8. Avoid skinny and tight bottoms that might emphasize wider hips more than you'd like.
            9. Stay away from embellished bottoms to draw less attention to the lower body.
            10. Skip details, patterns, pockets on your thigh and hip area, and belts on your hips for a smoother look overall.`,
            necklineRec: 'Wide necklines should be used to optically enlarge the pear body shape\'s shoulder and bust. Choose lower, wider necklines, such as square, bateau, and Sabrina necklines. Off-shoulder necklines add a few inches to your upper torso.',
            influencers: (
              <span>
                Fashion influencers like <a href="https://www.instagram.com/ukaraobong_?igsh=MXAyOTAxOHg2ZThtZg==" className='text-blue-700 underline' target='_top'>Ukara Ubong</a> are of pear body shape.
              </span>
            )
          };
        case 'apple':
          return {
            styleGuide: `1. Choose clothing that is straight to slightly fitted and made of soft fabric to avoid extra bulk around the bust, waist, and tummy.
            2. Focus on adding details above the bustline and below the hipline, and keep everything in between simple.
            3. Highlight details on the hemline to draw attention to the legs.
            4. Aim for a fitted silhouette under the bust, below the arms, and along the waist.
            5. Select structured garments to hold in and disguise extra weight.
            6. Wear bright colors on your lower body and darker colors around your waist area, such as a dark belt.
            7. Opt for clothes that skim over the midsection while nipping right below the bust to lift the chest and make the waist appear slimmer.
            8. Avoid excessive fabric around the midsection.
            9. Wide-leg, flowing trousers are very flattering on an apple body shape as they balance out the wider midsection with the slimmer legs.`,
            necklineRec: 'When choosing a neckline, opt for a style that is wide and low. A wide neckline will create the illusion of broad shoulders, while a low neckline will elongate the body and provide a flattering break in the chest area. V-Neckline is a great choice.',
            influencers: (
              <span>
                Fashion influencers like <a href="https://www.instagram.com/amymaha_?igsh=MTZoc3N5ZWVrZG0xaA==" className='text-blue-700 underline' target='_top'>Amy Maha</a> are of apple body shape.
              </span>
            )
          };
        case 'rectangle':
          return {
            styleGuide: `When aiming to create more curves, you can add volume to both your upper and lower body while leaving the waist as it is. Opt for flared bottoms such as pants or skirts. Alternatively, you can make your waist look slimmer by visually pulling it in and leaving the upper and lower body as they are. Use belted dresses or tops to create a waistline.
              Here are some additional tips:
              1. Wear well-structured clothing.
              2. Experiment with different cuts and shapes to create curves.
              3. Strategically use prints, textures, and details to create interest.
              4. Wear bright colors on your upper and lower body, but avoid them around the waist, instead wear darker colors around the waist area.
              5. Avoid clothes that end at the waist or emphasize it.
              6. Avoid tucking tops into trousers or skirts unless the bottoms have volume.`,
              necklineRec: 'To create curves, choose round necklines like scoop or jewel necklines. Lower, wider necklines such as wide V, slash, scoop, or sweetheart necklines lengthen the shoulder and bust area. Embellishments like big collars, lace trims, and ruffles can add volume and draw attention upwards. For a slender look, go for narrow necklines like turtlenecks, mandarin, crew, funnel, and halter necklines, and define the waist. Avoid square and straight necklines as they can add squareness to your body frame.',
              influencers: (
                <span>
                  Fashion influencers like <a href="https://www.instagram.com/amymaha_?igsh=MTZoc3N5ZWVrZG0xaA==" className='text-blue-700 underline' target='_top'>Amy Maha</a> are of rectangle body shape.
                </span>
              )
            };
        case 'invertedTriangle':
          return {
            styleGuide: `1. Soften broad shoulder lines with soft, draping, and weighty fabrics.
              2. Avoid wide necklines and strong shoulder details (e.g., shoulder pads) as they may broaden the shoulders.
              3. Steer clear of patterns on your tops and scarves around your neck and shoulders.
              4. Create the illusion of a defined waist with waist details.
              5. Choose clothes that add volume to the lower body to widen the hips.
              6. Draw attention to your legs by wearing lighter, brighter colors or adding details.
              7. Avoid skinny and tight trousers, as well as narrowing hemlines that visually reduce the lower body.
              8. Avoid cropped shirts that end at the waist and details or embellishments around the upper body and shoulder area.`,
            necklineRec: 'When choosing a neckline, opt for slim and long styles to visually reduce the width of the upper body. Deep and narrow scoop, U or V-necklines are great options. Asymmetric styles can help break up the chest vertically, while halter necks can help elongate the silhouette for those with a small bust. It is best to avoid wide and low necklines such as off-shoulder, bateau, square, and Sabrina styles, as they can add to the width of the shoulder line.',
            influencers: (
              <span>
                Fashion influencers like <a href="https://www.instagram.com/amymaha_?igsh=MTZoc3N5ZWVrZG0xaA==" className='text-blue-700 underline' target='_top'>Amy Maha</a> are of inverted triangle body shape.
              </span>
            )
          };
        case 'hourglass':
          return {
            styleGuide: `When dressing for this body shape, focus on maintaining balance and proportion to create a flattering silhouette. To achieve this, consider the following guidelines:
              1. Avoid drawing attention to the hips and shoulders. Opt for clothing styles that don't exaggerate these areas, as it can disrupt the natural balance of your body shape.
              2. Stay away from straight cuts and boxy styles that hide the waist. Instead, choose garments that accentuate or define the waistline to create a more balanced and shapely look.
              3. Refrain from wearing shapeless and loose-fitting clothing. These types of garments can overwhelm your frame and detract from your natural body shape.
              4. Avoid eye-catching embellishments that add unnecessary volume or bulk. This includes steering clear of big ruffles, bows, or other details that may disrupt the balance of your upper body without providing a flattering effect.`,
            necklineRec: 'Slightly rounded styles like oval, deep oval, rounded, or jewel necklines are great because they are not too wide or too narrow and do not draw attention. Lower and wider necklines like scoop, sweetheart, V-neck, and off-the-shoulder are also good options.',
            influencers: (
              <span>
                Fashion influencers like <a href="https://www.instagram.com/daaiizy?igsh=a2xtemU0ZzUxMGk4" className='text-blue-700 underline' target='_top'>Erastus Chiwenwa</a> are of hourglass body shape.
              </span>
            )
          };
        default:
          return {
            styleGuide: 'No specific styling tips available for this shape.',
            necklineRec: 'No specific neckline recommendation available for this shape.',
            influencers: 'No specific influencer available for this shape'
          };
      }
    };

    const recommendations: {styleGuide: string, necklineRec: string, influencers: any} = getRecommendations(maxShape);
    setStyleGuide(recommendations.styleGuide);
    setNecklineRec(recommendations.necklineRec);
    setInfluencer(recommendations.influencers)
  }, [shapePercentages]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto my-2 md:my-5 lg:my-10">
      <h1 className='text-xl md:text-2xl font-bold mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-600 to-blue-700'>Body Shape Predictor and Style Recommender</h1>
      <h2 className="text-lg md:text-2xl mb-2 text-gray-800">
        Based on your measurements, we've identified your body shape as: { }
        {Object.entries(shapePercentages)
          .filter(([shape, percentage]) => {
            const numericPercentage = parseFloat(percentage.toString());
            console.log(`${shape}: ${numericPercentage}%`);
            return numericPercentage > 1;
          })
          .sort((a, b) => parseFloat(b[1].toString()) - parseFloat(a[1].toString())) // Sort descending by percentage
          .map(([shape, percentage], index, array) => {
            const maxPercentage = parseFloat(array[0][1].toString());
            return (
              <span key={shape} className={parseFloat(percentage.toString()) === maxPercentage ? "font-bold" : ""}>
                {shape} ({percentage}){index < array.length - 1 ? ', ' : '.'}
              </span>
            );
          })}
      </h2>




      <div className="space-y-6">
        {/* {(widerShoulders || fullerBust || slimmerHips) && (
          <div>
            <h3 className="text-gray-700">Alongside this, you have</h3>
            <p className="text-gray-700">
              {(() => {
                const conditions = [];
                if (widerShoulders) conditions.push('broad shoulders');
                if (fullerBust) conditions.push('a full bust');
                if (slimmerHips) conditions.push('slightly slim hips');
                
                if (conditions.length === 2) {
                  return conditions.join(' & ') + '.';
                } else if (conditions.length > 2) {
                  return conditions.slice(0, -1).join(', ') + ' & ' + conditions.slice(-1) + '.';
                } else {
                  return conditions[0] + '.';
                }
              })()}
            </p>
          </div>
        )} */}
        <div>
          <p className="text-gray-600 whitespace-pre-line leading-8">
              <span className='font-semibold text-gray-800'>{primaryShape}: {bodyShapeDescriptions[primaryShape.toLowerCase()]} <br /></span>
              {Object.keys(bodyShapeDescriptions)
                .filter(shape => shape !== primaryShape.toLowerCase())
                .map((shape, index) => (
                  <span className='text-[14px]' key={index}>
                    <span className='font-semibold'>{shape.charAt(0).toUpperCase() + shape.slice(1)}: </span>
                    {bodyShapeDescriptions[shape]} <br />
                  </span>
                ))
              }
            </p>
          <h3 className="text-lg font-semibold text-gray-700 mt-10 leading-8">Neckline Recommendation</h3>
          {/* <Image 
            src={NecklinesImg} 
            alt='Neckline Vocabulary' 
            loading='lazy'
            placeholder='blur'
          /> */}

          <Image 
            src={bodyShapeImages[primaryShape.toLowerCase() as keyof typeof bodyShapeImages]} 
            alt={primaryShape}
            loading='lazy'
            // placeholder='blur'
            className="mx-auto"
          />
          <br />
          <p className="text-gray-600 leading-8">{necklineRec}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Style Guide</h3>
          <p className="text-gray-600 whitespace-pre-line leading-8">{styleGuide}</p>
          <p className="text-gray-600 whitespace-pre-line mt-2 leading-8">{influencer}</p>
        </div>
      </div>
    </div>
  );
};

export default ShapeResults;
