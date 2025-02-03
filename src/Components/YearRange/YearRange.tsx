const getCurrentYear = () => new Date().getFullYear();

interface IYearRangeProps {
  yearFrom: number;
  setYearFrom: (value: number) => void;
  yearTo: number;
  setYearTo: (value: number) => void;
}

const YearRange = ({ yearFrom, setYearFrom, yearTo, setYearTo }:IYearRangeProps) => {
  return (
    <>
      <div>
        <label>
          From: {yearFrom}
          <input
            type="range"
            min="1998"
            max={getCurrentYear().toString()}
            value={yearFrom}
            onChange={(e) => setYearFrom(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          To: {yearTo}
          <input
            type="range"
            min="1998"
            max={getCurrentYear().toString()}
            value={yearTo}
            onChange={(e) => setYearTo(parseInt(e.target.value, 10))}
          />
        </label>
      </div>
    </>
  );
};

export default YearRange;
