using AutoMapper;
using Punchcard.Core.Server.DataModel;
using Punchcard.Core.Server.ServiceModel.DTO;

namespace Punchcard.Core.Server.AutoMapperConfiguration
{
	public class UsersProfile : Profile
	{
		public UsersProfile()
		{
			this.ConfigureModelToContractMappings();
			this.ConfigureContractToModelMappings();
		}

		private void ConfigureModelToContractMappings()
		{
			this.CreateMap<PunchcardUser, CurrentUserDTO>()
				.ForMember(dest => dest.Roles, opt => opt.Ignore());
			this.CreateMap<PunchcardUser, UserDetailsDTO>();
		}

		private void ConfigureContractToModelMappings()
		{
			this.CreateMap<UserDetailsDTO, PunchcardUser>();
		}
	}
}
