package back.repository;

import back.entity.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentsRepository extends JpaRepository<DocumentEntity, Long> {

    void deleteAllByProcurementId(final Long id);
}
