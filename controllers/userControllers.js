
const COURTS = require("../models/courtSchema");
const COURT_SHEDULES = require("../models/courtSchedules");
// const { ObjectId } = require("mongodb");
const ObjectId = require("mongoose").Types.ObjectId;

// function getAllCourtData(req, res) {
//   try {
//     COURTS.find()
//     .then((response) => {
//       res.status(200).json(response);
//     })
//   } catch (error) {
    
//     res.status(501).json(err);
//   }
//   // COURTS.find()
//   //   .then((response) => {
//   //     res.status(200).json(response);
//   //   })
//   //   .catch((err) => {
//   //     res.status(501).json(err);
//   //   });
// }

async function getAllCourtData(req, res) {
  try {
    const response = await COURTS.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(501).json(err);
  }
}






const getSingleCourtData = async (req, res) => {
  try {
    const result = await COURTS.findOne({ _id: req.query.courtId });
    res.status(200).json(result);
  } catch (error) {}
};

const dayWiseTimeSlout = (req, res) => {
  // console.log(req.query.courtId, req.query.date, "7777777");
  // console.log(currentHours, "----currentHours----");
  let currentHour = new Date(req.query.date).getHours();
  // console.log(currentHour, "----currentHours----");
  let currentDate = new Date(new Date(req.query.date).setUTCHours(0, 0, 0, 0));
  // console.log(currentDate, "----currentDate----");
  COURT_SHEDULES.aggregate([
    {
      $match: {
        courtId: new ObjectId(req.query.courtId),
        date: currentDate,
        "slot.id": { $gt: currentHour + 1 },
      },
    },
    {
      $lookup: {
        from: "courts",
        localField: "courtId",
        foreignField: "_id",
        as: "court",
      },
    },
    {
      $project: {
        court: { $arrayElemAt: ["$court", 0] },
        _id: 1,
        date: 1,
        slot: 1,
        cost: 1,
        bookedBy: 1,
      },
    },
  ])
    .then((response) => {
      console.log(response, "---response---");
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getMyBookingData = (req, res) => {
  const currentDate = new Date();
  const slotHours = currentDate.getHours();
  currentDate.setUTCHours(0, 0, 0, 0);

  COURT_SHEDULES.aggregate([
    {
      $match: {
        bookedBy: new ObjectId(req.userID),
        $expr: {
          $or: [
            { $gt: ["$date", currentDate] },
            {
              $and: [
                { $eq: ["$date", currentDate] },
                { $gte: ["$slot.id", slotHours] },
              ],
            },
          ],
        },
      },


    },
    {
      $lookup:{
        from:'courts',
        localField:'courtId',
        foreignField:'_id',
        as:'courts'
      }
    },

    // {
// courts:[{}]
    // },

    {
      $project:{
        _id:1,
        date:1,
        slot:1,
        courtData:{$arrayElemAt:['$courts', 0]}
      }
    }
  ]).then((response)=>{
    console.log(response);
    res.status(200).json(response)
  })
};

module.exports = {
  getAllCourtData,
  getSingleCourtData,
  dayWiseTimeSlout,
  getMyBookingData,
};
