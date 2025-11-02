package contact.app.bf.service.impl;

import contact.app.bf.domain.Contact;
import contact.app.bf.repository.ContactRepository;
import contact.app.bf.service.ContactService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link contact.app.bf.domain.Contact}.
 */
@Service
@Transactional
public class ContactServiceImpl implements ContactService {

    private static final Logger LOG = LoggerFactory.getLogger(ContactServiceImpl.class);

    private final ContactRepository contactRepository;

    public ContactServiceImpl(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public Contact save(Contact contact) {
        LOG.debug("Request to save Contact : {}", contact);
        return contactRepository.save(contact);
    }

    @Override
    public Contact update(Contact contact) {
        LOG.debug("Request to update Contact : {}", contact);
        return contactRepository.save(contact);
    }

    @Override
    public Optional<Contact> partialUpdate(Contact contact) {
        LOG.debug("Request to partially update Contact : {}", contact);

        return contactRepository
            .findById(contact.getId())
            .map(existingContact -> {
                if (contact.getNom() != null) {
                    existingContact.setNom(contact.getNom());
                }
                if (contact.getPrenom() != null) {
                    existingContact.setPrenom(contact.getPrenom());
                }
                if (contact.getEmail() != null) {
                    existingContact.setEmail(contact.getEmail());
                }
                if (contact.getStreet() != null) {
                    existingContact.setStreet(contact.getStreet());
                }
                if (contact.getTelephone() != null) {
                    existingContact.setTelephone(contact.getTelephone());
                }

                return existingContact;
            })
            .map(contactRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Contact> findAll(Pageable pageable) {
        LOG.debug("Request to get all Contacts");
        return contactRepository.findAll(pageable);
    }

    public Page<Contact> findAllWithEagerRelationships(Pageable pageable) {
        return contactRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Contact> findOne(Long id) {
        LOG.debug("Request to get Contact : {}", id);
        return contactRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        LOG.debug("Request to delete Contact : {}", id);
        contactRepository.deleteById(id);
    }
}
