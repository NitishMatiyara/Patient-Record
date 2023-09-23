import PatientPaymentModel from "./patientPaymentModel.js";

class PatientPaymentController {
  static addPayment = async (req, res) => {
    try {
      const { amount, description, date } = req?.body?.paymentDetail;
      const { patientId } = req?.query;
      const payment_Detail = {
        amount,
        description,
        date,
        patientId,
        userId: req.user._id,
      };
      let paymentData;
      paymentData = await PatientPaymentModel.findOne({
        userId: req.user._id,
        date,
        patientId,
        amount,
      });
      if (paymentData != null) {
        return res
          .status(409)
          .send({ status: "failed", message: "Payment already exists." });
      } else {
        paymentData = new PatientPaymentModel(payment_Detail);
        await paymentData.save();
        return res
          .status(201)
          .send({ status: "success", message: "Payment added successfully" });
      }
    } catch (error) {
      return res.status(400).send({
        status: "failed",
        message: "Unable to add payment.",
        error: error,
      });
    }
  };
  static getPayment = async (req, res) => {
    try {
      const { paymentId } = req.query;
      const paymentData = await PatientPaymentModel.findOne({ _id: paymentId });
      paymentData == null
        ? res
            .status(400)
            .send({ status: "failed", message: "Invalid Id passed" })
        : res.status(200).send({
            status: "success",
            message: "Payment detail fetched successfully",
            data: paymentData,
          });
    } catch (error) {
      if (error.name == "CaseError")
        return res
          .status(400)
          .send({ status: "failed", message: "Invalid Payment Id" });

      return res.status(400).send({
        status: "failed",
        message: "Unable to get payment",
        error: error,
      });
    }
  };
  static getAllPayments = async (req, res) => {
    try {
      const userId = req.user._id;
      const { patientId } = req.query;
      const paymentData = await PatientPaymentModel.find({
        userId: userId,
        patientId,
      });
      return res.status(200).send({
        status: "success",
        message: "Payment details fetched successfully",
        data: paymentData,
      });
    } catch (error) {
      return res.status(400).send({
        status: "failed",
        message: "Unable to fetch payments",
        error: error,
      });
    }
  };
  static updatePayment = async (req, res) => {
    try {
      const { date, description, amount } = req?.body?.paymentDetail;
      const { paymentId } = req?.query;
      const payment_detail = {
        date,
        description,
        amount,
      };

      let paymentData;
      paymentData = await PatientPaymentModel.findOne({
        userId: req.user._id,
        date,
        paymentId,
        amount,
        description,
      });
      if (paymentData != null) {
        return res
          .status(409)
          .send({ status: "failed", message: "Payment already exists." });
      } else {
        const updatedPayment = await PatientPaymentModel.findByIdAndUpdate(
          { _id: paymentId },
          { $set: payment_detail }
        );
        return res.status(201).send({
          status: "success",
          message: "Payment detail updated successfully",
        });
      }
    } catch (error) {
      return res.status(400).send({
        status: "failed",
        message: "Unable to update payment",
        error: error,
      });
    }
  };
  static deletePayment = async (req, res) => {
    try {
      const { paymentId } = req.query;
      const paymentData = await PatientPaymentModel.findOneAndDelete({
        _id: paymentId,
        userId: req.user._id,
      });
      return res
        .status(201)
        .send({ status: "success", message: "Payment deleted successfully" });
    } catch (error) {
      return res.status(400).send({
        status: "failed",
        message: "Unable to delete patient",
        error: error,
      });
    }
  };
}

export default PatientPaymentController;
