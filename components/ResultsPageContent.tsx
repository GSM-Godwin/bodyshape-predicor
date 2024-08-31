import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';
import ShapeResults from './ShapeResults';

const ResultsPageContent = () => {
  const searchParams = useSearchParams();
  const [shapePercentages, setShapePercentages] = useState<{ [key: string]: number } | null>(null);
  const [primaryShape, setPrimaryShape] = useState<string | null>(null);
  const [widerShoulders, setWiderShoulders] = useState<boolean | null>(null);
  const [slimmerHips, setSlimmerHips] = useState<boolean | null>(null);
  const [fullerBust, setFullerBust] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchShapeType = async () => {
      if (searchParams) {
        const measurements = {
          shoulderWidth: searchParams.get('shoulderWidth'),
          bustCircumference: searchParams.get('bustCircumference'),
          waistCircumference: searchParams.get('waistCircumference'),
          hipCircumference: searchParams.get('hipCircumference'),
        };
        console.log("Measurements:", measurements);

        try {
          const res = await fetch('/api/shape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(measurements),
          });

          const data = await res.json();
          console.log("Received Data:", data);

          if (res.ok) {
            setShapePercentages(data.shapePercentages);
            setWiderShoulders(data.widerShoulders);
            setSlimmerHips(data.slimmerHips);
            setFullerBust(data.fullerBust);
            setPrimaryShape(data.primaryShape)
          } else {
            console.error("Error fetching shape type:", data);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchShapeType();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {shapePercentages && primaryShape ? (
        <ShapeResults
          shapePercentages={shapePercentages}
          primaryShape={primaryShape}
          widerShoulders={widerShoulders}
          slimmerHips={slimmerHips}
          fullerBust={fullerBust}
        />
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <CircleLoader size="10vw" />
          <p className='text-[#0a0a0a]'>Modeling your body shape...</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPageContent;
