import Nodata from "../../assets/nodata.jpg";

export default function NoData() {
  return (
    <div className="px-4 text-center">
      <img
        src={Nodata}
        alt="No Data"
        className="mx-auto w-[80%] md:w-[35%]"
      />
      <h2 className="text-[#1F263E] text-xl font-semibold mt-4">No Data</h2>
    </div>
  );
}
