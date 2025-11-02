package contact.app.bf.service.impl;

import contact.app.bf.domain.Groupe;
import contact.app.bf.repository.GroupeRepository;
import contact.app.bf.service.GroupeService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link contact.app.bf.domain.Groupe}.
 */
@Service
@Transactional
public class GroupeServiceImpl implements GroupeService {

    private static final Logger LOG = LoggerFactory.getLogger(GroupeServiceImpl.class);

    private final GroupeRepository groupeRepository;

    public GroupeServiceImpl(GroupeRepository groupeRepository) {
        this.groupeRepository = groupeRepository;
    }

    @Override
    public Groupe save(Groupe groupe) {
        LOG.debug("Request to save Groupe : {}", groupe);
        return groupeRepository.save(groupe);
    }

    @Override
    public Groupe update(Groupe groupe) {
        LOG.debug("Request to update Groupe : {}", groupe);
        return groupeRepository.save(groupe);
    }

    @Override
    public Optional<Groupe> partialUpdate(Groupe groupe) {
        LOG.debug("Request to partially update Groupe : {}", groupe);

        return groupeRepository
            .findById(groupe.getId())
            .map(existingGroupe -> {
                if (groupe.getNom() != null) {
                    existingGroupe.setNom(groupe.getNom());
                }

                return existingGroupe;
            })
            .map(groupeRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Groupe> findAll(Pageable pageable) {
        LOG.debug("Request to get all Groupes");
        return groupeRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Groupe> findOne(Long id) {
        LOG.debug("Request to get Groupe : {}", id);
        return groupeRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Groupe : {}", id);
        groupeRepository.deleteById(id);
    }
}
