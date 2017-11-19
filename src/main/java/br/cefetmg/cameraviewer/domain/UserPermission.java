package br.cefetmg.cameraviewer.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A UserPermission.
 */
@Entity
@Table(name = "user_permission")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserPermission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_permission_cameras_that_have_access",
               joinColumns = @JoinColumn(name="user_permissions_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="cameras_that_have_accesses_id", referencedColumnName="id"))
    private Set<Camera> camerasThatHaveAccesses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public UserPermission user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Camera> getCamerasThatHaveAccesses() {
        return camerasThatHaveAccesses;
    }

    public UserPermission camerasThatHaveAccesses(Set<Camera> cameras) {
        this.camerasThatHaveAccesses = cameras;
        return this;
    }

    public UserPermission addCamerasThatHaveAccess(Camera camera) {
        this.camerasThatHaveAccesses.add(camera);
        camera.getUsersWithAccesses().add(this);
        return this;
    }

    public UserPermission removeCamerasThatHaveAccess(Camera camera) {
        this.camerasThatHaveAccesses.remove(camera);
        camera.getUsersWithAccesses().remove(this);
        return this;
    }

    public void setCamerasThatHaveAccesses(Set<Camera> cameras) {
        this.camerasThatHaveAccesses = cameras;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UserPermission userPermission = (UserPermission) o;
        if (userPermission.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userPermission.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserPermission{" +
            "id=" + getId() +
            "}";
    }
}
