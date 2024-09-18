using System;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceModel.Requests;
using ServiceStack;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.ServiceModel.DTO;
using Server.ServiceModel.Requests;
using Microsoft.Extensions.Logging;

namespace Punchcard.Core.Server.ServiceInterface.PunchcardCore;

public class ProductService : Service
{
	private readonly AppSettings _appSettings;
	private new readonly DatabaseContext Db;
	private readonly ILogger<ProductService> _logger;

	public ProductService(AppSettings appSettings, DatabaseContext databaseContext)
	{
		_appSettings = appSettings;
		Db = databaseContext;
	}

	public async Task<List<ProductDTO>> Get(ProductsRequest request) 
	{
		try
		{
			List<ProductDTO> items = await Db.ProductList.Select(y => new ProductDTO()
			{
				Id = y.Id,
				TannerId = y.TannerId,
				ProductName = y.ProductName,
				ProductType = y.ProductType,
			}).ToListAsync();
			return items;
		}
		catch (Exception e)
		{
			_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, e.Message);
			throw;
		}
	}
	
	
	public async Task<ProductDTO> Get(ProductRequest request)
	{
		try
		{
			ProductList product = await Db.ProductList.Where(x => x.Id == request.Id).FirstOrDefaultAsync();
			ProductDTO productDTO = product.ConvertTo<ProductDTO>();
			return productDTO;

		}
		catch (Exception e)
		{
			_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, e.Message);
			throw;
		}	
	}
	

	public async Task<ProductList> Post(ProductRequest request)
	{
		try
		{
			ProductList product = await Db.ProductList.FindAsync(request.Id);
			if (product == null) 
			{
				product = request.ConvertTo<ProductList>();
				Db.ProductList.Add(product);
			}
			else
			{
				product = product.PopulateWith<ProductList, ProductRequest>(request);
			}
			await Db.SaveChangesAsync();
			return product;
		}
		catch (Exception ex)
		{
			_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, ex.Message);
			throw;
		}
	}

	public async Task<string> Post(PostDeleteProductRequest request)
	{
		try
		{
			ProductList product = await Db.ProductList.FindAsync(request.Id);
			if (product != null)
			{
				Db.ProductList.Remove(product);
				await Db.SaveChangesAsync();
				return "Successfully Removed Product";
			}

			return "Unable to Remove Product";
		}
		catch (Exception e)
		{
			_logger.LogError("Error - User:{userid} - Message:{message}", GetSession().UserName, e.Message);
			throw;
		}
	}
}