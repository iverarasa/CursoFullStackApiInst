package mx.gob.asa.gestion_usuarios.Controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.gob.asa.gestion_usuarios.Dto.DepartamentoDto;
import mx.gob.asa.gestion_usuarios.Service.DepartamentoService;

@RestController 
@RequestMapping("/api/departamentos")
public class DepartamentoController {
    private final DepartamentoService departamentoService;
    private final ModelMapper modelMapper;

    public DepartamentoController(DepartamentoService departamentoService, ModelMapper modelMapper) {
        this.departamentoService = departamentoService;
        this.modelMapper = modelMapper;
    }

    @GetMapping 
    public List<DepartamentoDto> findAll(){
        System.out.println("findAll() called in DepartamentoController");
        return departamentoService.findAll().stream()
            .map(depto -> modelMapper.map(depto, DepartamentoDto.class))
            .toList();
    }
    
}
