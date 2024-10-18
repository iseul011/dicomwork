package com.study.finalProject.service;

import com.study.finalProject.domain.Member;
import com.study.finalProject.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String memId) throws UsernameNotFoundException {
        Member member = memberRepository.findById(memId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with memId: " + memId));

        return new User(
                member.getMemId(),
                member.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(member.getRole()))
        );
    }
}
