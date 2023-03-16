import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        // remove password from response
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        // get all friends
        const friends = await Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
        );
        // format friends list so password is not returned to frontend
        const formattedFriends = friends.map((friend) => {
            const { password, ...other } = friend._doc;
            return other;
        });
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        // get user and friend
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        // check if friend is already in user's friends list
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        
        // get all friends
        const friends = await Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
        );
        // format friends list so password is not returned to frontend
        const formattedFriends = friends.map((friend) => {
            const { password, ...other } = friend._doc;
            return other;
        });
        res.status(200).json(formattedFriends);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
