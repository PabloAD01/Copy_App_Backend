import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel.js";
import PremiumProduct from "../models/PremiumProductModel.js";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const transformProductDate = (product) => ({
  ...product.toObject(),
  createdAt: product.createdAt.toLocaleDateString("es-ES", options),
  updatedAt: product.updatedAt.toLocaleDateString("es-ES", options),
});

export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  product;
  const product = await Product.findById(id);

  res.status(StatusCodes.OK).json({ product });
};

export const getSinglePremiumProduct = async (req, res) => {
  const { id } = req.params;
  const product = await PremiumProduct.findById(id);
  res.status(StatusCodes.OK).json({ product });
};

export const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);

    const transformedProducts = products.map(transformProductDate);

    const totalProducts = await Product.countDocuments();
    const numOfPages = Math.ceil(totalProducts / limit);
    res.status(StatusCodes.OK).json({
      products: transformedProducts,
      totalProducts,
      numOfPages,
      currentPage: page,
    });
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
    req.body.createdBy = req.user.userId;

    const imageUrls = req.body.images || [];

    // Crea el producto con las URLs de las imágenes
    req.body.imageUrls = imageUrls;
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

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "product modified successfully", updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const removeProduct = await Product.findByIdAndDelete(id);

  res
    .status(StatusCodes.OK)
    .json({ msg: "product deleted", product: removeProduct });
};

export const updatePremiumProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "product modified successfully", updatedProduct });
};

export const deletePremiumProduct = async (req, res) => {
  const { id } = req.params;
  const removeProduct = await Product.findByIdAndDelete(id);

  res
    .status(StatusCodes.OK)
    .json({ msg: "product deleted", product: removeProduct });
};
