import { BiCalendarWeek } from 'react-icons/bi';
import { MdDining, MdFreeBreakfast, MdLunchDining } from 'react-icons/md';

export const FoodTable = () => {
  return (
    <div className="w-full h-auto ">
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
              <th className="flex px-4 py-2 font-bold text-white uppercase align-middle bg-orange-400 rounded-lg">
                SUNDAY
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>

            <tr className="text-xl font-medium text-accent">
              <th className="flex px-4 py-2 font-bold text-white uppercase align-middle rounded-lg bg-light-green-400 ">
                Monday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr className="text-xl font-medium text-accent">
              <th className="flex px-4 py-2 font-bold text-white uppercase align-middle bg-red-400 rounded-lg 0 ">
                Tuesday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr className="text-xl font-medium text-accent">
              <th className="flex px-4 py-2 font-bold text-white uppercase align-middle bg-green-400 rounded-lg">
                Wednesday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr className="text-xl font-medium text-accent">
              <th className="flex px-4 py-2 font-bold text-white uppercase align-middle bg-yellow-400 rounded-lg">
                Thursday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr className="text-xl font-medium text-accent">
              <th className="flex px-4 py-2 font-bold text-white uppercase align-middle bg-blue-400 rounded-lg">
                Friday
              </th>

              <td>_</td>
              <td>_</td>
              <td>_</td>
            </tr>
            <tr className="text-xl font-medium text-accent">
              <th className="flex px-4 py-2 font-bold text-white uppercase align-middle rounded-lg bg-neutral-400">
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
