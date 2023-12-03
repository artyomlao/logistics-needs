package back.service;

import back.entity.ProcurementEntity;
import back.exception.EntityNotFoundException;
import back.model.ProcurementModel;
import back.repository.ProcurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static back.model.mapper.Mappers.PROCUREMENT_MAPPER;

@Service
public class ProcurementService {

    private final ProcurementRepository procurementRepository;

    @Autowired
    public ProcurementService(final ProcurementRepository procurementRepository) {
        this.procurementRepository = procurementRepository;
    }

    public ProcurementEntity insertProcurement(final ProcurementModel model) {
        return PROCUREMENT_MAPPER.toEntity(model);
    }

    public ProcurementEntity selectById(final Long id) {
        return procurementRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ProcurementEntity.class, "Procurement wasn't found"));
    }

    public List<ProcurementEntity> list() {
        return procurementRepository.findAll();
    }

    public ProcurementEntity updateById(final Long id, final ProcurementModel model) {
        final ProcurementEntity entityToUpdate = procurementRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(ProcurementEntity.class, "Procurement wasn't found"));

        return procurementRepository.save(entityToUpdate
                .setName(model.getName())
                .setDescription(model.getDescription())
                .setPrice(model.getPrice())
                .setQuantity(model.getQuantity()));
    }
}
