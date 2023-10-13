import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel.js";
import PremiumProduct from "../models/PremiumProductModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);

    const totalProducts = await Product.countDocuments();
    const numOfPages = Math.ceil(totalProducts / limit);
    res
      .status(StatusCodes.OK)
      .json({ products, totalProducts, numOfPages, currentPage: page });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error al obtener productos" });
  }
};

export const getAllPremiumProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await PremiumProduct.find().skip(skip).limit(limit);

    const totalProducts = await PremiumProduct.countDocuments();
    const numOfPages = Math.ceil(totalProducts / limit);
    res
      .status(StatusCodes.OK)
      .json({ products, totalProducts, numOfPages, currentPage: page });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error al obtener productos" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error al crear el producto" });
  }
};

export const createPremiumProduct = async (req, res) => {
  try {
    const product = await PremiumProduct.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error al crear el producto" });
  }
};
