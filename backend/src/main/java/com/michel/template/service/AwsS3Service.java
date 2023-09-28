package com.michel.template.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.michel.template.utils.FileUploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class AwsS3Service {

    @Value("${project.s3.repo}")
    private String s3Repo;

    @Value("${project.mainURL}")
    private String mainUrl;

    @Value("${spring.profiles.active}")
    private String profile;

    @Autowired
    private AmazonS3 amazonS3;

    public String getURL(String folder, String file) {
        return mainUrl + folder + "/" + file;
    }

    public String getFile(String folder, String file) {
        if (amazonS3.doesObjectExist(s3Repo, folder + "/" + file)) {
            return getURL(folder, file).toString();
        }
        return null;
    }

    public List<String> getFiles(String folder) {
        List<String> files = new ArrayList<>();
        for (S3ObjectSummary objectSummary : amazonS3.listObjects(s3Repo, folder).getObjectSummaries()) {
            String file = getFile(folder, objectSummary.getKey().replace(folder + "/", ""));
            if (file != null) {
                files.add(file);
            }
        }
        return files;
    }

    public void uploadFile(String folder, String file, MultipartFile multipartFile) {
        String tempFileName = "TEMP_" + file;
        try {
            FileUploadUtil.saveFile(tempFileName, multipartFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        amazonS3.putObject(s3Repo, folder + "/" + file, new File(tempFileName));
        new File(tempFileName).delete();
    }

    public void removeFile(String folder, String file) {
        amazonS3.deleteObject(s3Repo, folder + "/" + file);
    }

}
