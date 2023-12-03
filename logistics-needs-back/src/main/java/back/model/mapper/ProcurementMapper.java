package back.model.mapper;

import back.entity.ProcurementEntity;
import back.model.ProcurementModel;

public class ProcurementMapper {

    public ProcurementModel toModel(final ProcurementEntity entity) {
        return new ProcurementModel()
                .setName(entity.getName())
                .setDescription(entity.getDescription())
                .setQuantity(entity.getQuantity())
                .setPrice(entity.getPrice())
                .setPurchaseTime(entity.getPurchaseTime())
                .setUserId(entity.getUserId());
    }

    public ProcurementEntity toEntity(final ProcurementModel model) {
        return new ProcurementEntity()
                .setName(model.getName())
                .setQuantity(model.getQuantity())
                .setPrice(model.getPrice())
                .setDescription(model.getDescription())
                .setQuantity(model.getQuantity())
                .setUserId(model.getUserId());
    }
}
