package back.controller;

import back.entity.ProcurementEntity;
import back.model.ProcurementModel;
import back.service.ProcurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/procurement")
@CrossOrigin
public class ProcurementController {

    private final ProcurementService procurementService;

    @Autowired
    public ProcurementController(final ProcurementService procurementService) {
        this.procurementService = procurementService;
    }

    @PostMapping
    public ResponseEntity<ProcurementEntity> insert(final @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(procurementService.insertProcurement(user));
    }

    @GetMapping
    public ResponseEntity<List<ProcurementEntity>> list() {
        final List<ProcurementEntity> list = procurementService.list();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{procurementId}")
    public ResponseEntity<?> byId(final @PathVariable("procurementId") Long id) {
        return ResponseEntity.ok(procurementService.selectById(id));
    }

    @PutMapping("/{procurementId}")
    public ResponseEntity<?> update(
            final @PathVariable("procurementId") Long id, final @RequestBody ProcurementModel model) {

        return ResponseEntity.ok(procurementService.updateById(id, model));
    }
}
