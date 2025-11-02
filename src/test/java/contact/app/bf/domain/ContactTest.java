package contact.app.bf.domain;

import static contact.app.bf.domain.ContactTestSamples.*;
import static contact.app.bf.domain.GroupeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import contact.app.bf.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContactTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contact.class);
        Contact contact1 = getContactSample1();
        Contact contact2 = new Contact();
        assertThat(contact1).isNotEqualTo(contact2);

        contact2.setId(contact1.getId());
        assertThat(contact1).isEqualTo(contact2);

        contact2 = getContactSample2();
        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    void groupe_idTest() {
        Contact contact = getContactRandomSampleGenerator();
        Groupe groupeBack = getGroupeRandomSampleGenerator();

        contact.setGroupe_id(groupeBack);
        assertThat(contact.getGroupe_id()).isEqualTo(groupeBack);

        contact.groupe_id(null);
        assertThat(contact.getGroupe_id()).isNull();
    }
}
