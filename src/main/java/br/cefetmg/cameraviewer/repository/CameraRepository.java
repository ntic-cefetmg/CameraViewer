package br.cefetmg.cameraviewer.repository;

import br.cefetmg.cameraviewer.domain.Camera;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Camera entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CameraRepository extends JpaRepository<Camera, Long> {
    @Query("select distinct camera from Camera camera left join fetch camera.usersWithAccesses")
    List<Camera> findAllWithEagerRelationships();

    @Query("select camera from Camera camera left join fetch camera.usersWithAccesses where camera.id =:id")
    Camera findOneWithEagerRelationships(@Param("id") Long id);

}
