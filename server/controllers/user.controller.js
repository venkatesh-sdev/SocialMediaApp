import User from "../models/User.js"

export const getUser = async (req, res) => {
    try {
        // Extract User_Id  from params
        const { id } = req.params;

        // Getting User From DB
        const user = await User.findById({ _id: id });
        const { _id, firstName, lastName, occupation, location, picturePath } = user;
        // Sending User Data as Response
        res.status(200).json({ _id, firstName, lastName, occupation, location, picturePath });
    } catch (error) {
        // Sending Unhandled Error as Response
        res.status(500).json({ message: error.message });
    }
}
export const getUserFriends = async (req, res) => {
    try {

        // Extract User_Id  from params
        const { id } = req.params;

        // Getting User From DB
        const user = await User.findById({ _id: id });

        // Get All Friends data 
        const friends = await Promise.all(
            user.friends.map((id) => User.findById({ _id: id }))
        );

        // Format All Friends data for the response
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => ({ _id, firstName, lastName, occupation, location, picturePath })
        );

        // Sending User Friends as Response
        res.status(200).json(formattedFriends);

    } catch (error) {
        // Sending Unhandled Error as Response
        res.status(500).json({ message: error.message })
    }
}
export const addRemoveFriends = async (req, res) => {
    try {
        // Extract User_Id and Friend_Id from params
        const { id, friendId } = req.params;

        // Getting User and Friend From DB
        const user = await User.findById({ _id: id });
        const friend = await User.findById({ _id: friendId });

        // Add If They are not Friends OR Remove If they already friends
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter(friend => friend.id !== friendId);
            friend.friends = friend.friends.filter(friend => friend.id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        // Save the Changes to the DB
        await user.save();
        await friend.save();

        // Get All Friends data 
        const friends = await Promise.all(
            user.friends.map((id) => User.findById({ _id: id }))
        );

        // Format All Friends data for the response
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => ({ _id, firstName, lastName, occupation, location, picturePath })
        );

        // Sending Updated Friends Data as Response
        res.status(200).json(formattedFriends);

    } catch (error) {
        // Sending Unhandled Error as Response
        res.status(500).json({ message: error.message })
    }
}