const staticContent = require('../../models/staticContent');
const Faq = require("../../models/faq.Model");
exports.createAboutUs = async (req, res) => {
        try {
                const data = await staticContent.findOne({ type: "ABOUTUS" });
                if (!data) {
                        let image;
                        if (req.file) {
                                image = req.file.path;
                        }
                        let desc = [];
                        for (let i = 0; i < req.body.title.length; i++) {
                                let obj = {
                                        title: req.body.title[i],
                                        desc: req.body.desc[i],
                                }
                                desc.push(obj)
                        }
                        const newAboutUs = {
                                desc: desc,
                                image: image,
                                type: "ABOUTUS"
                        }
                        const result = await staticContent.create(newAboutUs)
                        return res.status(200).json({ status: 200, message: "Data found successfully.", data: result });
                } else {
                        let image;
                        if (req.file) {
                                image = req.file.path;
                        } else {
                                image = data.image;
                        }
                        let desc = [];
                        if (req.body.title == (null || undefined)) {
                                desc = data.desc;
                        } else {
                                for (let i = 0; i < req.body.title.length; i++) {
                                        let obj = {
                                                title: req.body.title[i],
                                                desc: req.body.desc[i],
                                        }
                                        desc.push(obj)
                                }
                        }
                        const result = await staticContent.findByIdAndUpdate({ _id: data._id }, { $set: { image: image, desc: desc, type: data.type, } }, { new: true });
                        return res.status(200).json({ status: 200, message: "update successfully.", data: result });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getAboutUs = async (req, res) => {
        try {
                const result = await staticContent.findOne({ type: "ABOUTUS" }).select('-title');
                if (!result) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Data found successfully.", data: result });

        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getAboutUsById = async (req, res) => {
        try {
                const data = await staticContent.findById(req.params.id);
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.updateAboutUs = async (req, res) => {
        try {
                const data = await staticContent.findById(req.params.id);
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                } else {
                        let image;
                        if (req.file) {
                                image = req.file.path;
                        } else {
                                image = data.image;
                        }
                        let desc = [];
                        if (req.body.title == (null || undefined)) {
                                desc = data.desc;
                        } else {
                                for (let i = 0; i < req.body.title.length; i++) {
                                        let obj = {
                                                title: req.body.title[i],
                                                desc: req.body.desc[i],
                                        }
                                        desc.push(obj)
                                }
                        }
                        let Title = req.body.Title || data.title;
                        const result = await staticContent.findByIdAndUpdate({ _id: req.params.id }, { $set: { title: Title, image: image, desc: desc, type: data.type, } }, { new: true });
                        return res.status(200).json({ status: 200, message: "update successfully.", data: result });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.deleteAboutUs = async (req, res) => {
        try {
                const result = await staticContent.findByIdAndDelete({ _id: req.params.id });
                return res.status(200).json({ message: "ok" })
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.createTerms = async (req, res) => {
        try {
                if (!req.body.terms) {
                        return res.status(400).send("please specify terms");
                }
                const result = await staticContent.create({ terms: req.body.terms, type: "TERMS" });
                return res.status(200).json({ status: 200, message: "Data create successfully.", data: result });
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.updateTerms = async (req, res) => {
        try {
                const data = await staticContent.findById(req.params.id);
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                } else {
                        let terms = req.body.terms || data.terms;
                        const data1 = await staticContent.findOneAndUpdate({ id: req.params.id }, { terms: terms, type: "TERMS" }, { new: true, });
                        return res.status(200).json({ status: 200, message: "update successfully.", data: data1 });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getTerms = async (req, res) => {
        try {
                const data = await staticContent.find({ type: "TERMS" });
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getTermsbyId = async (req, res) => {
        try {
                const data = await staticContent.findById(req.params.id);
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.deleteTerms = async (req, res) => {
        try {
                const data = await staticContent.findByIdAndDelete(req.params.id);
                if (!data) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Deleted Successfully", });
        } catch (err) {
                console.log(err.message);
                return res.status(500).send({ msg: "internal server error", error: err.message });
        }
};
exports.createPrivacy = async (req, res) => {
        try {
                if (!req.body.privacy) {
                        return res.status(400).send("please specify privacy");
                }
                const result = await staticContent.create({ privacy: req.body.privacy, type: "PRIVACY" });
                return res.status(200).json({ status: 200, message: "Data create successfully.", data: result });
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.updatePrivacy = async (req, res) => {
        try {
                const data = await staticContent.findById(req.params.id);
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                } else {
                        let privacy = req.body.privacy || data.privacy;
                        const data1 = await staticContent.findByIdAndUpdate({ _id: req.params.id }, { privacy: privacy, type: data.type }, { new: true, });
                        return res.status(200).json({ status: 200, message: "update successfully.", data: data1 });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getPrivacy = async (req, res) => {
        try {
                const data = await staticContent.find({ type: "PRIVACY" });
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getPrivacybyId = async (req, res) => {
        try {
                const data = await staticContent.findById(req.params.id);
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.deletePrivacy = async (req, res) => {
        try {
                const data = await staticContent.findByIdAndDelete(req.params.id);
                if (!data) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Deleted Successfully", });
        } catch (err) {
                console.log(err.message);
                return res.status(500).send({ msg: "internal server error", error: err.message });
        }
};
exports.createCancelationPrivacy = async (req, res) => {
        try {
                if (!req.body.privacy) {
                        return res.status(400).send("please specify privacy");
                }
                const result = await staticContent.create({ privacy: req.body.privacy, type: "CANCELATION" });
                return res.status(200).json({ status: 200, message: "Data create successfully.", data: result });
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.updateCancelationPrivacy = async (req, res) => {
        try {
                const data = await staticContent.findById(req.params.id);
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                } else {
                        let privacy = req.body.privacy || data.privacy;
                        const data1 = await staticContent.findByIdAndUpdate({ _id: req.params.id }, { privacy: privacy, type: data.type }, { new: true, });
                        return res.status(200).json({ status: 200, message: "update successfully.", data: data1 });
                }
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getCancelationPrivacy = async (req, res) => {
        try {
                const data = await staticContent.find({ type: "CANCELATION" });
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getCancelationPrivacybyId = async (req, res) => {
        try {
                const data = await staticContent.findById(req.params.id);
                if (!data || data.length === 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
        } catch (error) {
                console.log(error);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.deleteCancelationPrivacy = async (req, res) => {
        try {
                const data = await staticContent.findByIdAndDelete(req.params.id);
                if (!data) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "Deleted Successfully", });
        } catch (err) {
                console.log(err.message);
                return res.status(500).send({ msg: "internal server error", error: err.message });
        }
};
exports.getAllFaqs = async (req, res) => {
        try {
                const faqs = await Faq.find({ type: req.params.type }).lean();
                if (faqs.length == 0) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "faqs retrieved successfully ", data: faqs });
        } catch (err) {
                console.log(err);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.getFaqById = async (req, res) => {
        const { id } = req.params;
        try {
                const faq = await Faq.findById(id);
                if (!faq) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "faqs retrieved successfully ", data: faq });
        } catch (err) {
                console.log(err);
                return res.status(501).send({ status: 501, message: "server error.", data: {}, });
        }
};
exports.createFaq = async (req, res) => {
        const { question, answer, type } = req.body;
        try {
                if (!question || !answer) {
                        return res.status(400).json({ message: "questions and answers cannot be blank " });
                }
                const faq = await Faq.create(req.body);
                return res.status(200).json({ status: 200, message: "FAQ Added Successfully ", data: faq });
        } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Error ", status: 500, data: err.message });
        }
};
exports.updateFaq = async (req, res) => {
        const { id } = req.params;
        try {
                const faq = await Faq.findByIdAndUpdate(id, req.body, { new: true });
                if (!faq) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "update successfully.", data: faq });
        } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Something went wrong ", status: 500, data: err.message });
        }
};
exports.deleteFaq = async (req, res) => {
        const { id } = req.params;
        try {
                const faq = await Faq.findByIdAndDelete(id);
                if (!faq) {
                        return res.status(404).json({ status: 404, message: "No data found", data: {} });
                }
                return res.status(200).json({ status: 200, message: "FAQ Deleted Successfully ", data: faq });
        } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Something went wrong ", status: 500, data: err.message });
        }
};