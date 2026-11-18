package mx.gob.asa.gestion_usuarios.Controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mx.gob.asa.gestion_usuarios.Dto.RolDto;
import mx.gob.asa.gestion_usuarios.Service.RolService;

@RestController 
@RequestMapping("/api/roles")
public class RolController {
    private final RolService rolService;
    private final ModelMapper modelMapper;

    public RolController(RolService rolService, ModelMapper modelMapper) {
        this.rolService = rolService;
        this.modelMapper = modelMapper;
    }

    @GetMapping 
    public List<RolDto> findAll(){
        return rolService.findAll().stream()
            .map(depto -> modelMapper.map(depto, RolDto.class))
            .toList();
    }
}
