const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {

        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true
        },
        status: {
            type: String,
            require: true,
            enum: {
                values: ["ignored", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`
            }
        }

    },
    {
        timestamps: true
    }
)


connectionRequestSchema.pre("save", async function (next) {
    const connectionRequest = this;
    // check if fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send requests to yourself!!");
    }
    next();

})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;