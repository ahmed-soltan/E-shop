import prisma from "../libs/prismadb";

export type IProductsParams = {
  category?: string | null;
  searchItem?: string | null;
};

export const getProducts = async (params: IProductsParams) => {
  try {
    const { category, searchItem } = params;
    let searchString = searchItem;
    if (!searchString) {
      searchString = "";
    }
    let query: any = {};

    if (category !== null && category !== undefined) {
      query.category = category;
    }
    
    const products = await prisma.products.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reveiws: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return products;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of error
  }
};

