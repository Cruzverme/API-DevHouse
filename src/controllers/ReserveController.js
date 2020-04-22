import Reserve from "../models/Reserve";
import User from "../models/User";
import House from "../models/House";

class ReserveController {
  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);
    const user = await User.findById(user_id);

    if(!house){
      return res.status(400).json({error: "Invalid House"});
    }

    if(house.status !== true){
      return res.status(400).json({error: "Unvailable House"});
    }

    if(String(user._id) === String(house.user)){
      return res.status(400).json({error: "You cant reserve your house"});
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date: date,
    });

    await reserve.populate('house').populate('user').execPopulate();

    
    return res.json(reserve);
  }
  
}

export default new ReserveController();