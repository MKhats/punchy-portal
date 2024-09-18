using AutoMapper;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceModel.DTO;

namespace Punchcard.Core.Server.AutoMapperConfiguration
{
	public class PickListProfile : Profile
	{
		public PickListProfile()
		{
			this.ConfigureModelToDtoMappings();
			this.ConfigureDtoToModelMappings();
		}

		private void ConfigureModelToDtoMappings()
		{
			this.CreateMap<PickListItem, PickListItemResponseDTO>();
			//this.CreateMap<PickListItem, int>().ConstructUsing(x => x.Id);
		}

		private void ConfigureDtoToModelMappings()
		{
			this.CreateMap<PickListItemResponseDTO, PickListItem>();
		}
	}
}
