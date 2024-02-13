import { Sales } from '../sales/sales.model';
import { historyQuery } from './history.constant';

// sales history
const salesHistoryFromDB = async (query: string) => {
  let aggregationPipeline;

  switch (query) {
    case historyQuery.WEEKLY:
      aggregationPipeline = [
        {
          $group: {
            _id: {
              week: { $week: { $toDate: '$saleDate' } },
            },
            totalQuantity: { $sum: '$quantity' },
            productDetails: {
              $push: {
                _id: '$productId',
                name: '$productName',
                price: '$productPrice',
                quantity: '$quantity',
                releaseDate: '$productReleaseDate',
                brand: '$productBrand',
                style: '$productStyle',
                size: '$productSize',
                color: '$productColor',
              },
            },
          },
        },
        {
          $lookup: {
            from: 'shoes',
            localField: 'productDetails._id',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $project: {
            date: '$_id.week',
            totalQuantity: 1,
            productDetails: 1,
            _id: 0,
          },
        },
      ];

      break;
    case historyQuery.DAILY:
      aggregationPipeline = [
        {
          $group: {
            _id: {
              year: {
                $year: { $dateFromString: { dateString: '$saleDate' } },
              },
              month: {
                $month: { $dateFromString: { dateString: '$saleDate' } },
              },
              day: {
                $dayOfMonth: { $dateFromString: { dateString: '$saleDate' } },
              },
            },
            totalQuantity: { $sum: '$quantity' },
            productDetails: {
              $push: {
                _id: '$productId',
              },
            },
          },
        },
        {
          $lookup: {
            from: 'shoes',
            localField: 'productDetails._id',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $project: {
            _id: 0,
            date: {
              $dateFromParts: {
                year: '$_id.year',
                month: '$_id.month',
                day: '$_id.day',
              },
            },
            totalQuantity: 1,
            products: 1,
            productDetails: 1,
          },
        },
      ];
      break;
    case historyQuery.MONTHLY:
      aggregationPipeline = [
        {
          $group: {
            _id: {
              year: { $year: { $toDate: '$saleDate' } },
              month: { $month: { $toDate: '$saleDate' } },
            },
            totalQuantity: { $sum: '$quantity' },
            productDetails: {
              $push: {
                _id: '$productId',
              },
            },
          },
        },
        {
          $lookup: {
            from: 'shoes',
            localField: 'productDetails._id',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $project: {
            _id: 0,
            date: {
              $concat: [
                {
                  $arrayElemAt: [
                    [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ],
                    { $subtract: ['$_id.month', 1] },
                  ],
                },
                ', ',
                { $toString: '$_id.year' },
              ],
            },
            totalQuantity: 1,
            products: 1,
            productDetails: 1,
          },
        },
      ];

      break;
    case historyQuery.YEARLY:
      aggregationPipeline = [
        {
          $group: {
            _id: {
              year: { $year: { $toDate: '$saleDate' } },
            },
            totalQuantity: { $sum: '$quantity' },
            productDetails: {
              $push: {
                _id: '$productId',
              },
            },
          },
        },
        {
          $lookup: {
            from: 'shoes',
            localField: 'productDetails._id',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $project: {
            _id: 0,
            date: '$_id.year',
            totalQuantity: 1,
            products: 1,
            productDetails: 1,
          },
        },
      ];
      break;
    default:
      throw new Error('Invalid query type');
  }

  const result = await Sales.aggregate(aggregationPipeline);
  return result;
};

export const HistoryServices = { salesHistoryFromDB };
