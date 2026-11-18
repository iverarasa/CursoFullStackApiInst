package mx.gob.asa.gestion_usuarios.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import mx.gob.asa.gestion_usuarios.Dto.UsuarioDto;
import mx.gob.asa.gestion_usuarios.Exception.AppException;
import mx.gob.asa.gestion_usuarios.Model.Usuario;
import mx.gob.asa.gestion_usuarios.Pagination.PageResponse;
import mx.gob.asa.gestion_usuarios.Service.UsuarioService;

@RestController
@RequestMapping("/api/usuario")
@AllArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> findAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> findById(
        @PathVariable  Long id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @PostMapping
    public ResponseEntity<UsuarioDto> save(
        @RequestBody UsuarioDto usuarioDto) {
            
        return new ResponseEntity<>(
            usuarioService.save(usuarioDto),
            HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteById(
        @PathVariable Long id) {

        usuarioService.delete(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/paginate")
    public PageResponse<UsuarioDto> paginate(
        @RequestParam(value = "pageNumber", defaultValue = "0", required = true) Integer pageNumber,
        @RequestParam(value = "pageSize", defaultValue = "5", required = false) Integer pageSize
    ) {
        return usuarioService.paginate(pageNumber, pageSize);
    }

    @PutMapping("/{id}") 
    public ResponseEntity<UsuarioDto> update(
        @PathVariable Long id,
        @RequestBody UsuarioDto usuarioDto
    ) {
        System.out.println("Entraa update");
        if (id != null && id < 1) {
            throw new AppException(
                "Error: en el id", 
                HttpStatus.BAD_REQUEST, 
                "");
        }

        usuarioDto.setId(id);
        UsuarioDto usuarioActualizado = usuarioService.save(usuarioDto);
        
        return new ResponseEntity<>( usuarioActualizado, HttpStatus.OK);
    }
}
