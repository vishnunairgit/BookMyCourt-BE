const COURT = require("../models/courtSchema");
const COURT_SCHEDULES = require("../models/courtSchedules");



const addCourtData= async (req, res) => {
  // console.log( "hiii");
  try {
    await COURT({
      CourtName: req.query.CourtName,
      location: req.query.location,
      address: req.query.address,
      type: req.query.type,
      courtPic: req.file.filename,
    }).save();
    res.status(200).json("court registration success");
  } catch (error) {
    res.status(401).json("court registration failed");
  }
};



const addTimeSlotData = (req, res) => {
    try {
      const { startDate, endDate, cost, selectedTime, courtId } = req.body;
      let currentDate = new Date(startDate);
      const lastDate = new Date(endDate);
      const slotObjects = [];
  
      while (currentDate <= lastDate) {
        for (let data of selectedTime) { // Corrected from "date of selectedTime"
          slotObjects.push({
            // if we push data like this the date valu wont chnage it will show same date only. 
                        // date: currentDate,
            // for tha we need to use
            date:new Date(JSON.parse(JSON.stringify(currentDate))),
            slot: {
              name: data.name,
              id: data.id, // Corrected from "id: date.id"
            },
            cost,
            courtId,
          });
        }
        // Increment the current date
        currentDate.setDate(currentDate.getDate() + 1);
      }
      COURT_SCHEDULES.insertMany(slotObjects).then((response)=>{
        console.log(response);
        res.status(200).json({ message: "Time slot data added successfully", slotObjects });
      })
      // Your logic to save or process the slotObjects goes here
      // Assuming you are sending a response, you can modify this as needed
      console.log(slotObjects,"slots");
    } catch (error) {
      console.error("Error adding time slot data:",error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// editCourtfunction

 const updateEditCourtData = (req,res)=>{
  // console.log(req.body);

  COURT.updateOne({_id:req.body._id},{$set:{CourtName:req.body.CourtName, 
    location:req.body.location,
    address:req.body.address,
    type:req.body.type
  }}).then((response)=>{
    res.status(200).json({response})
  })

 }

module.exports={ addCourtData, addTimeSlotData, updateEditCourtData}

