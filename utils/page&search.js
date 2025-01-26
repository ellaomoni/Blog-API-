const paginateAndSearch = async = async (model, query, page, limit, searchField) => {

    // Convert 'page' and 'limit' to numbers with deafut values 
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    //Build search filter
    const searchFiter = query ? { [searchField]: { $regex: query, $options: 'i' } } : {}; //case-insensitive search

    // Count total results for pagination metadata
    const totaLResults = await model.countDocuments(searchFiter);

    // Fetch the paginated and filtered data
    const results = await model
        .find(searchFilter)
        .skip((pageNumber - 1) * limitNumber) // Skip results for previous pages
        .limit(limitNumber); // Limit results to the current page


        // Return the results and pagination metadata
    return {
        results,
        pagination: {
            totalResults,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalResults / limitNumber),
            hasNextPage: pageNumber * limitNumber < totalResults,
            hasPreviousPage: pageNumber > 1,
        },
    };
};
    

