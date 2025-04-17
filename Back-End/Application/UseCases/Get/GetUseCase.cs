using Application.Interfaces;
using Application.DTOs;
using AutoMapper;


namespace Application.UseCases
{
    public class GetUseCase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public GetUseCase(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProductDTO>> Get()
        {
            var products = await _productRepository.GetProducts();
            return _mapper.Map<IEnumerable<ProductDTO>>(products);
        }   

    }
}