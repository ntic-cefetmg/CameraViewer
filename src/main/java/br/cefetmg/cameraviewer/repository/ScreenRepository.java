package br.cefetmg.cameraviewer.repository;

import br.cefetmg.cameraviewer.domain.Screen;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Screen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScreenRepository extends JpaRepository<Screen, Long> {
    @Query("select distinct screen from Screen screen left join fetch screen.cameras")
    List<Screen> findAllWithEagerRelationships();

    @Query("select screen from Screen screen left join fetch screen.cameras where screen.id =:id")
    Screen findOneWithEagerRelationships(@Param("id") Long id);

}
