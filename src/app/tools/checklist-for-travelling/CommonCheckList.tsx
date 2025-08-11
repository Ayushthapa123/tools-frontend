import PrintButton from "./PrintButton";

export default function CommonCheckList() {



    return (
        <>
      <section className="max-w-full  p-6 print:p-4 bg-white">
        <h2 className="text-3xl font-bold mb-6 ">Common Travel Checklist</h2>
        <p className="mb-6 text-gray-600 ">
          Tick items as you prepare for your trip. Optimized for both web and print.
        </p>
  
        {/* Documents */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3">
            <label><input type="checkbox" className="mr-2" /> Passport / ID (with copies)</label>
            <label><input type="checkbox" className="mr-2" /> Tickets / Boarding passes / Reservations</label>
            <label><input type="checkbox" className="mr-2" /> Visa(s) / permits (if required)</label>
            <label><input type="checkbox" className="mr-2" /> Travel insurance / Health insurance card</label>
            <label><input type="checkbox" className="mr-2" /> Emergency contact list</label>
          </div>
        </div>
  
        {/* Money & Payments */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Money & Payments</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3">
            <label><input type="checkbox" className="mr-2" /> Local cash (small denominations)</label>
            <label><input type="checkbox" className="mr-2" /> Debit/Credit cards</label>
            <label><input type="checkbox" className="mr-2" /> Prepaid currency/travel card</label>
            <label><input type="checkbox" className="mr-2" /> Emergency funds (hidden stash)</label>
          </div>
        </div>
  
        {/* Clothing */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Clothing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3">
            <label><input type="checkbox" className="mr-2" /> Weather-appropriate outfits</label>
            <label><input type="checkbox" className="mr-2" /> Comfortable shoes</label>
            <label><input type="checkbox" className="mr-2" /> Sleepwear</label>
            <label><input type="checkbox" className="mr-2" /> Accessories (hats, scarves, belts)</label>
            <label><input type="checkbox" className="mr-2" /> Extra socks and underwear</label>
          </div>
        </div>
  
        {/* Health & Safety */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Health & Safety</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3">
            <label><input type="checkbox" className="mr-2" /> First aid kit</label>
            <label><input type="checkbox" className="mr-2" /> Prescription medications</label>
            <label><input type="checkbox" className="mr-2" /> Face masks / hand sanitizer</label>
            <label><input type="checkbox" className="mr-2" /> Insect repellent / sunscreen</label>
            <label><input type="checkbox" className="mr-2" /> Emergency whistle / torch</label>
          </div>
        </div>
  
        {/* Daily Use */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Daily Use</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3">
            <label><input type="checkbox" className="mr-2" /> Toiletries (toothbrush, toothpaste, shampoo, etc.)</label>
            <label><input type="checkbox" className="mr-2" /> Towel</label>
            <label><input type="checkbox" className="mr-2" /> Reusable shopping bag</label>
            <label><input type="checkbox" className="mr-2" /> Water bottle</label>
            <label><input type="checkbox" className="mr-2" /> Notebook & pen</label>
          </div>
        </div>
  
        {/* Snacks & Hydration */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Snacks & Hydration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3">
            <label><input type="checkbox" className="mr-2" /> Energy bars / trail mix</label>
            <label><input type="checkbox" className="mr-2" /> Fruits</label>
            <label><input type="checkbox" className="mr-2" /> Electrolyte powder / drinks</label>
            <label><input type="checkbox" className="mr-2" /> Instant coffee / tea bags</label>
          </div>
        </div>
  
        {/* Tools & Electronics */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Tools & Electronics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3">
            <label><input type="checkbox" className="mr-2" /> Phone & charger</label>
            <label><input type="checkbox" className="mr-2" /> Power bank</label>
            <label><input type="checkbox" className="mr-2" /> Travel adapter</label>
            <label><input type="checkbox" className="mr-2" /> Camera & accessories</label>
            <label><input type="checkbox" className="mr-2" /> Multi-tool / Swiss knife</label>
          </div>
        </div>
  
        {/* Other Recommendations */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3">Other Recommendations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3">
            <label><input type="checkbox" className="mr-2" /> Guidebook / travel apps</label>
            <label><input type="checkbox" className="mr-2" /> Small lock for luggage</label>
            <label><input type="checkbox" className="mr-2" /> Plastic zip bags</label>
            <label><input type="checkbox" className="mr-2" /> Laundry bag</label>
          </div>
        </div>
  
        {/* Must Have Rechecks */}
        <div>
          <h3 className="text-2xl font-semibold mb-3">Must Have Rechecks (Reminders)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3">
            <label><input type="checkbox" className="mr-2" /> Check weather forecast</label>
            <label><input type="checkbox" className="mr-2" /> Confirm bookings</label>
            <label><input type="checkbox" className="mr-2" /> Charge all devices</label>
            <label><input type="checkbox" className="mr-2" /> Secure home before leaving</label>
            <label><input type="checkbox" className="mr-2" /> Keep essential items accessible</label>
          </div>
        </div>
        
      </section>
      <PrintButton/>
      </>
    );
  }
  