import { formatDistance, formatRelative, subDays } from "date-fns";
function Card(data) {
  const date = formatRelative(
    subDays(new Date(data.created_at), 3),
    new Date()
  );
  const date2 = formatDistance(
    subDays(new Date(data.created_at), 3),
    new Date(),
    { addSuffix: false }
  );
  return (
    <>
      <div className="bg-[#dddddd] p-2 rounded-lg shadow-md h-30 m-7">
        <h1 className="text-2xl font-bold mb-5">{data.title}</h1>
        <div className="">
          <p>
            {data.point} point by {data.author} | {date} ({date2})
          </p>
          <p>{data.commentNumber} comments</p>
        </div>
      </div>
    </>
  );
}

export default Card;
