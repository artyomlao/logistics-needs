package back.service;

import back.entity.DocumentEntity;
import back.entity.ProcurementEntity;
import back.entity.UserEntity;
import back.exception.EntityNotFoundException;
import back.exception.UserNotFoundException;
import back.model.ProcurementModel;
import back.repository.DocumentsRepository;
import back.repository.ProcurementRepository;
import back.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProcurementService {

    private final ProcurementRepository procurementRepository;
    private final DocumentsRepository documentsRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProcurementService(
            final ProcurementRepository procurementRepository,
            final DocumentsRepository documentsRepository,
            final UserRepository userRepository) {

        this.procurementRepository = procurementRepository;
        this.documentsRepository = documentsRepository;
        this.userRepository = userRepository;
    }

    public ProcurementEntity insertProcurement(final User user) {
        final UserEntity userEntity = userRepository.findFirstByEmail(user.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User wasn't found"));

        return procurementRepository.save(new ProcurementEntity()
                .setUserId(userEntity.getId())
                .setPurchaseTime(LocalDateTime.now()));
    }

    public ProcurementEntity selectById(final Long id) {
        return procurementRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ProcurementEntity.class, "Procurement wasn't found"));
    }

    public List<ProcurementEntity> list() {
        return procurementRepository.findAll();
    }

    @Transactional
    public ProcurementEntity updateById(final Long id, final ProcurementModel model) {
        final ProcurementEntity entityToUpdate = procurementRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(ProcurementEntity.class, "Procurement wasn't found"));

        documentsRepository.deleteAllByProcurementId(id);

        final List<String> documentsToAdd = model.getDocuments();
        final List<DocumentEntity> documentEntities = new ArrayList<>();

        documentsToAdd.forEach(s -> documentEntities.add(new DocumentEntity()
                .setProcurementId(id)
                .setName(s)));

        documentsRepository.saveAll(documentEntities);

        return procurementRepository.save(entityToUpdate
                .setName(model.getName())
                .setDescription(model.getDescription())
                .setPrice(model.getPrice())
                .setQuantity(model.getQuantity())
                .setStatus(model.getStatus())
                .setDocuments(documentEntities));
    }
}
