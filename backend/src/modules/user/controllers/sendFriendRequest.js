export async function sendFriendRequest(req, res) {
  const userId = req.user._id;
  const receiverId = req.params.id;

  const alreadyExists = await KnowUser.findOne({
    userId,
    knownUserId: receiverId,
  });
  if (alreadyExists) {
    return res.status(400).json({ message: "Request already exists." });
  }

  const request = await KnowUser.create({
    userId,
    knownUserId: receiverId,
    status: "pending",
  });

  res.status(201).json({ message: "Friend request sent.", request });
}
