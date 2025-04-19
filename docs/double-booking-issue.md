### How do we resolve? 
1. Check the room availibility on clicking on "Next" at the end of first step: pass params:  1.roomId,startDate,endDate. 

2. If found room unavailable or on Idle. Check idle with the help of Idle createdAt time. -> Check this createdAt timing in backend and pass message according to this. 

3. Before Opening the checkout url check again.  or on calling for checkout url on response send message as room has been taken already. you are late. 