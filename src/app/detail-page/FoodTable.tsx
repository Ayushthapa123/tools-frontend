import { BiCalendarWeek } from 'react-icons/bi';
import { MdDining, MdFreeBreakfast, MdLunchDining } from 'react-icons/md';

export const FoodTable = () => {
  return (
    <div className="h-auto w-full ">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-2xl ">
              <th>
                <BiCalendarWeek />
              </th>
              <th className="gap-1 ">
                <span>
                  <MdFreeBreakfast className="relative top-1" />
                </span>
                Breakfast
              </th>
              <th className="gap-1 ">
                <span>
                  <MdLunchDining className="relative top-1" />
                </span>
                Lunch
              </th>

              <th className="gap-1 ">
                <span>
                  <MdDining className="relative top-1" />
                </span>
                Dinner
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="text-xl font-medium text-accent">
              <th className="flex rounded-lg bg-orange-400 px-4 py-2 align-middle font-bold uppercase text-white">
                SUNDAY
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>

            <tr className="text-xl font-medium text-accent">
              <th className="bg-light-green-400 flex rounded-lg px-4 py-2 align-middle font-bold uppercase text-white ">
                Monday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr className="text-xl font-medium text-accent">
              <th className="bg-red-400 0 flex rounded-lg px-4 py-2 align-middle font-bold uppercase text-white ">
                Tuesday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr className="text-xl font-medium text-accent">
              <th className="bg-green-400 flex rounded-lg px-4 py-2 align-middle font-bold uppercase text-white">
                Wednesday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr className="text-xl font-medium text-accent">
              <th className="flex rounded-lg bg-yellow-400 px-4 py-2 align-middle font-bold uppercase text-white">
                Thursday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr className="text-xl font-medium text-accent">
              <th className="bg-blue-400 flex rounded-lg px-4 py-2 align-middle font-bold uppercase text-white">
                Friday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr className="text-xl font-medium text-accent">
              <th className="flex rounded-lg bg-neutral-400 px-4 py-2 align-middle font-bold uppercase text-white">
                Saturday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
